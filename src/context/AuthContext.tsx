import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import {
  AuthContextType,
  AuthResolutionStatus,
  FirestoreInternalEmployee,
  FirestorePermissionTemplate,
  FirestoreUserProfile,
  IdentityFailureReason,
  IdentityResolutionAudit,
} from '../types/auth';

const INITIAL_RESOLUTION_AUDIT: IdentityResolutionAudit = {
  userDocLoaded: false,
  userValidated: false,
  linkedEmployeeId: null,
  employeeDocLoaded: false,
  employeeValidated: false,
  linkedDesignationId: null,
  permissionTemplateAttempted: false,
  permissionTemplateLoaded: false,
  failureReason: 'none',
  errorCode: null,
  errorMessage: null,
};

const INACTIVE_STATUS_VALUES = new Set([
  'inactive',
  'disabled',
  'suspended',
  'revoked',
  'blocked',
  'terminated',
  'archived',
  'deleted',
  'pending',
  'resigned',
  'relieved',
]);

const ACTIVE_USER_STATUS_VALUES = new Set(['active', 'enabled', 'verified', 'approved']);

const ACTIVE_EMPLOYEE_STATUS_VALUES = new Set([
  'active',
  'available',
  'in meeting',
  'offline',
  'working',
  'present',
  'on leave',
]);

const DISALLOWED_EXTERNAL_ROLES = new Set([
  'student',
  'parent',
  'guardian',
  'school_admin',
  'school_staff',
  'teacher',
  'principal',
  'school_owner',
  'external',
  'guest',
]);

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

function asOptionalBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

/**
 * Validates whether `/users/{uid}` represents an active user account.
 * Requires an explicit active status or `isActive === true` and rejects any inactive/disabled flags.
 */
function isUserAccountActive(profile: FirestoreUserProfile): boolean {
  if (profile.isActive === false) {
    return false;
  }

  const rawStatus = asNonEmptyString(profile.status ?? profile.accountStatus)?.toLowerCase();
  if (rawStatus) {
    if (INACTIVE_STATUS_VALUES.has(rawStatus)) {
      return false;
    }
    if (ACTIVE_USER_STATUS_VALUES.has(rawStatus)) {
      return true;
    }
    return false;
  }

  return profile.isActive === true;
}

/**
 * Validates whether `/users/{uid}` has an internal staff role eligible for the Internal Staff Dashboard.
 */
function isUserRoleValidForInternalStaff(profile: FirestoreUserProfile): boolean {
  const roleValue = asNonEmptyString(profile.role ?? profile.roleKey)?.toLowerCase();
  if (!roleValue) {
    return false;
  }
  if (DISALLOWED_EXTERNAL_ROLES.has(roleValue)) {
    return false;
  }
  return true;
}

/**
 * Validates whether `/internal_employees/{employeeId}` is an active employee record.
 */
function isEmployeeRecordActive(employee: FirestoreInternalEmployee): boolean {
  if (employee.isActive === false) {
    return false;
  }

  const rawStatus = asNonEmptyString(employee.status)?.toLowerCase();
  if (rawStatus) {
    if (INACTIVE_STATUS_VALUES.has(rawStatus)) {
      return false;
    }
    if (ACTIVE_EMPLOYEE_STATUS_VALUES.has(rawStatus)) {
      return true;
    }
    return false;
  }

  return employee.isActive === true;
}

function mapFirestoreUserProfile(uid: string, data: Record<string, unknown>): FirestoreUserProfile {
  return {
    uid,
    id: uid,
    email: asNonEmptyString(data.email) ?? asNonEmptyString(data.emailAddress),
    fullName: asNonEmptyString(data.fullName),
    name: asNonEmptyString(data.name) ?? asNonEmptyString(data.fullName),
    displayName: asNonEmptyString(data.displayName),
    role: asNonEmptyString(data.role),
    roleKey: asNonEmptyString(data.roleKey),
    status: asNonEmptyString(data.status),
    accountStatus: asNonEmptyString(data.accountStatus),
    isActive: asOptionalBoolean(data.isActive),
    employeeId: asNonEmptyString(data.employeeId),
    empId: asNonEmptyString(data.empId),
    department: asNonEmptyString(data.department),
    designation: asNonEmptyString(data.designation),
    designationId: asNonEmptyString(data.designationId),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    raw: data,
  };
}

function mapFirestoreInternalEmployee(
  docId: string,
  data: Record<string, unknown>
): FirestoreInternalEmployee {
  return {
    id: docId,
    empId: asNonEmptyString(data.empId) ?? asNonEmptyString(data.id),
    employeeId: asNonEmptyString(data.employeeId) ?? docId,
    uid: asNonEmptyString(data.uid),
    userId: asNonEmptyString(data.userId),
    fullName: asNonEmptyString(data.fullName) ?? asNonEmptyString(data.name),
    name: asNonEmptyString(data.name) ?? asNonEmptyString(data.fullName),
    emailAddress: asNonEmptyString(data.emailAddress) ?? asNonEmptyString(data.email),
    email: asNonEmptyString(data.email) ?? asNonEmptyString(data.emailAddress),
    personalEmail: asNonEmptyString(data.personalEmail),
    phoneNumber: asNonEmptyString(data.phoneNumber) ?? asNonEmptyString(data.contactNumber),
    contactNumber: asNonEmptyString(data.contactNumber) ?? asNonEmptyString(data.phoneNumber),
    roleTitle: asNonEmptyString(data.roleTitle) ?? asNonEmptyString(data.role),
    role: asNonEmptyString(data.role) ?? asNonEmptyString(data.roleTitle),
    roleKey: asNonEmptyString(data.roleKey),
    department: asNonEmptyString(data.department),
    designation: asNonEmptyString(data.designation),
    designationId: asNonEmptyString(data.designationId),
    reportingManager: asNonEmptyString(data.reportingManager),
    workLocation: asNonEmptyString(data.workLocation),
    workType: asNonEmptyString(data.workType),
    availability: asNonEmptyString(data.availability),
    dateOfJoining: asNonEmptyString(data.dateOfJoining),
    employmentType: asNonEmptyString(data.employmentType),
    avatarPhotoUrl: asNonEmptyString(data.avatarPhotoUrl),
    avatarInitials: asNonEmptyString(data.avatarInitials) ?? asNonEmptyString(data.avatarText),
    avatarText: asNonEmptyString(data.avatarText) ?? asNonEmptyString(data.avatarInitials),
    status: asNonEmptyString(data.status),
    isActive: asOptionalBoolean(data.isActive),
    raw: data,
  };
}

function mapFirestorePermissionTemplate(
  docId: string,
  data: Record<string, unknown>
): FirestorePermissionTemplate {
  return {
    id: docId,
    designationId: asNonEmptyString(data.designationId) ?? docId,
    designation: asNonEmptyString(data.designation),
    name: asNonEmptyString(data.name) ?? asNonEmptyString(data.title),
    title: asNonEmptyString(data.title) ?? asNonEmptyString(data.name),
    department: asNonEmptyString(data.department),
    description: asNonEmptyString(data.description),
    status: asNonEmptyString(data.status),
    isActive: asOptionalBoolean(data.isActive),
    permissions:
      typeof data.permissions === 'object' && data.permissions !== null
        ? (data.permissions as Record<string, unknown> | string[])
        : undefined,
    modules:
      typeof data.modules === 'object' && data.modules !== null
        ? (data.modules as Record<string, unknown> | string[])
        : undefined,
    workspaces:
      typeof data.workspaces === 'object' && data.workspaces !== null
        ? (data.workspaces as Record<string, unknown> | string[])
        : undefined,
    raw: data,
  };
}

function extractFirestoreErrorDetails(err: unknown): {
  reason: IdentityFailureReason;
  code: string;
  message: string;
} {
  const firestoreErr = err as { code?: unknown; message?: unknown } | null;
  const code: string = typeof firestoreErr?.code === 'string' ? firestoreErr.code : 'unknown';
  const message: string =
    typeof firestoreErr?.message === 'string'
      ? firestoreErr.message
      : 'Failed to read identity record from Firestore.';
  const isPermissionDenied =
    code === 'permission-denied' ||
    code === 'firestore/permission-denied' ||
    message.toLowerCase().includes('missing or insufficient permissions');

  return {
    reason: isPermissionDenied ? 'permission_denied' : 'firestore_error',
    code,
    message,
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthResolutionStatus>('loading');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<FirestoreUserProfile | null>(null);
  const [employeeRecord, setEmployeeRecord] = useState<FirestoreInternalEmployee | null>(null);
  const [permissionTemplate, setPermissionTemplate] = useState<FirestorePermissionTemplate | null>(
    null
  );
  const [resolution, setResolution] = useState<IdentityResolutionAudit>(INITIAL_RESOLUTION_AUDIT);

  // Guard against stale async resolutions if auth state changes rapidly
  const resolutionRequestIdRef = useRef<number>(0);

  const resolveAuthenticatedIdentity = useCallback(async (user: User) => {
    const requestId = ++resolutionRequestIdRef.current;

    setIsLoading(true);
    setAuthStatus('loading');
    setUserProfile(null);
    setEmployeeRecord(null);
    setPermissionTemplate(null);
    setResolution(INITIAL_RESOLUTION_AUDIT);

    const audit: IdentityResolutionAudit = { ...INITIAL_RESOLUTION_AUDIT };

    try {
      // 1. Read `/users/{uid}`
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (requestId !== resolutionRequestIdRef.current) return;

      if (!userSnap.exists()) {
        audit.failureReason = 'missing_user_document';
        audit.errorMessage = `No user profile document found at /users/${user.uid}.`;
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      const parsedUser = mapFirestoreUserProfile(
        user.uid,
        userSnap.data() as Record<string, unknown>
      );
      audit.userDocLoaded = true;
      setUserProfile(parsedUser);

      // Validate `/users/{uid}` account status and role
      if (!isUserAccountActive(parsedUser)) {
        audit.failureReason = 'inactive_user_account';
        audit.errorMessage = 'User account status is inactive or disabled.';
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      if (!isUserRoleValidForInternalStaff(parsedUser)) {
        audit.failureReason = 'invalid_user_role';
        audit.errorMessage = 'User profile does not have a valid internal staff role.';
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      audit.userValidated = true;

      // 2. Resolve linked `/internal_employees/{employeeId}` using actual field names (`employeeId` or `empId`)
      const linkedEmployeeId = parsedUser.employeeId ?? parsedUser.empId ?? null;
      audit.linkedEmployeeId = linkedEmployeeId;

      if (!linkedEmployeeId) {
        audit.failureReason = 'missing_employee_id_link';
        audit.errorMessage =
          'User profile in /users/{uid} does not contain a linked employeeId or empId.';
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      const employeeDocRef = doc(db, 'internal_employees', linkedEmployeeId);
      const employeeSnap = await getDoc(employeeDocRef);

      if (requestId !== resolutionRequestIdRef.current) return;

      if (!employeeSnap.exists()) {
        audit.failureReason = 'missing_employee_document';
        audit.errorMessage = `Linked employee document /internal_employees/${linkedEmployeeId} does not exist.`;
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      const parsedEmployee = mapFirestoreInternalEmployee(
        employeeSnap.id,
        employeeSnap.data() as Record<string, unknown>
      );
      audit.employeeDocLoaded = true;
      setEmployeeRecord(parsedEmployee);

      if (!isEmployeeRecordActive(parsedEmployee)) {
        audit.failureReason = 'inactive_employee_record';
        audit.errorMessage = 'Linked internal employee record is inactive or not in active status.';
        setResolution(audit);
        setAuthStatus('authenticated_unverified');
        setIsLoading(false);
        return;
      }

      audit.employeeValidated = true;

      // 3. Resolve `/permission_templates/{designationId}` ONLY when employeeRecord provides a valid designationId
      const linkedDesignationId = parsedEmployee.designationId ?? null;
      audit.linkedDesignationId = linkedDesignationId;

      if (linkedDesignationId) {
        audit.permissionTemplateAttempted = true;
        try {
          const permDocRef = doc(db, 'permission_templates', linkedDesignationId);
          const permSnap = await getDoc(permDocRef);

          if (requestId !== resolutionRequestIdRef.current) return;

          if (permSnap.exists()) {
            const parsedTemplate = mapFirestorePermissionTemplate(
              permSnap.id,
              permSnap.data() as Record<string, unknown>
            );
            const templateStatus = parsedTemplate.status?.toLowerCase();
            const isTemplateInactive =
              parsedTemplate.isActive === false ||
              (templateStatus !== undefined && INACTIVE_STATUS_VALUES.has(templateStatus));

            if (!isTemplateInactive) {
              audit.permissionTemplateLoaded = true;
              setPermissionTemplate(parsedTemplate);
            }
          }
        } catch (permErr) {
          // Handle permission-denied or missing template errors gracefully without crashing or invalidating the verified employee identity
          if (requestId !== resolutionRequestIdRef.current) return;
          const details = extractFirestoreErrorDetails(permErr);
          audit.errorCode = details.code;
          audit.errorMessage = `Permission template read warning (${linkedDesignationId}): ${details.message}`;
        }
      }

      setResolution(audit);
      setAuthStatus('authenticated_verified');
      setIsLoading(false);
    } catch (err) {
      if (requestId !== resolutionRequestIdRef.current) return;
      const details = extractFirestoreErrorDetails(err);
      audit.failureReason = details.reason;
      audit.errorCode = details.code;
      audit.errorMessage = details.message;
      setResolution(audit);
      setAuthStatus(details.reason === 'permission_denied' ? 'authenticated_unverified' : 'error');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);

      if (!user) {
        resolutionRequestIdRef.current++;
        setUserProfile(null);
        setEmployeeRecord(null);
        setPermissionTemplate(null);
        setResolution(INITIAL_RESOLUTION_AUDIT);
        setAuthStatus('unauthenticated');
        setIsLoading(false);
        return;
      }

      void resolveAuthenticatedIdentity(user);
    });

    return () => unsubscribe();
  }, [resolveAuthenticatedIdentity]);

  const refreshIdentity = useCallback(async () => {
    if (!firebaseUser) {
      return;
    }
    await resolveAuthenticatedIdentity(firebaseUser);
  }, [firebaseUser, resolveAuthenticatedIdentity]);

  const signOutUser = useCallback(async () => {
    resolutionRequestIdRef.current++;
    await signOut(auth);
  }, []);

  const isAuthenticated = firebaseUser !== null;
  const isAuthorizedEmployee =
    isAuthenticated &&
    authStatus === 'authenticated_verified' &&
    resolution.userDocLoaded &&
    resolution.userValidated &&
    resolution.employeeDocLoaded &&
    resolution.employeeValidated &&
    userProfile !== null &&
    employeeRecord !== null;
  const isDemoMode = firebaseUser === null;

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        isLoading,
        isAuthenticated,
        isAuthorizedEmployee,
        isDemoMode,
        firebaseUser,
        userProfile,
        employeeRecord,
        permissionTemplate,
        resolution,
        refreshIdentity,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
