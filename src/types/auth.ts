import type { User } from 'firebase/auth';
import type { UserRole } from './support';

/**
 * High-level authentication and identity verification state.
 * - 'loading': Waiting for initial Firebase Auth state or Firestore profile resolution
 * - 'unauthenticated': No Firebase user signed in; app operates in preserved local/demo mode
 * - 'authenticated_verified': Firebase user is signed in AND both /users/{uid} and /internal_employees/{employeeId} are verified active
 * - 'authenticated_unverified': Firebase user is signed in, but /users/{uid} or /internal_employees/{employeeId} is missing, inactive, unauthorized, or inaccessible
 * - 'error': Unexpected error while resolving identity
 */
export type AuthResolutionStatus =
  | 'loading'
  | 'unauthenticated'
  | 'authenticated_verified'
  | 'authenticated_unverified'
  | 'error';

export type IdentityFailureReason =
  | 'none'
  | 'missing_user_document'
  | 'inactive_user_account'
  | 'invalid_user_role'
  | 'missing_employee_id_link'
  | 'missing_employee_document'
  | 'inactive_employee_record'
  | 'permission_denied'
  | 'firestore_error';

/**
 * Document structure for `/users/{uid}` in `offsleek-shared-backend`.
 * Preserves raw Firestore fields while typing known identity and linkage fields.
 */
export interface FirestoreUserProfile {
  uid: string;
  id: string;
  email?: string;
  fullName?: string;
  name?: string;
  displayName?: string;
  role?: string;
  roleKey?: UserRole | string;
  status?: string;
  accountStatus?: string;
  isActive?: boolean;
  employeeId?: string;
  empId?: string;
  department?: string;
  designation?: string;
  designationId?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  raw: Record<string, unknown>;
}

/**
 * Document structure for `/internal_employees/{employeeId}` in `offsleek-shared-backend`.
 * Aligns with the existing project's EmployeeProfile (`src/types/profile.ts`),
 * Employee (`src/types/support.ts`), and RosterEmployee (`src/views/RosterView.tsx`) fields.
 */
export interface FirestoreInternalEmployee {
  /** Firestore document ID in `/internal_employees/{employeeId}` */
  id: string;
  /** Employee code / ID (e.g., "EMP-1006" or "emp-101") */
  empId?: string;
  employeeId?: string;
  uid?: string;
  userId?: string;
  fullName?: string;
  name?: string;
  emailAddress?: string;
  email?: string;
  personalEmail?: string;
  phoneNumber?: string;
  contactNumber?: string;
  roleTitle?: string;
  role?: string;
  roleKey?: UserRole | string;
  department?: string;
  designation?: string;
  designationId?: string;
  reportingManager?: string;
  workLocation?: string;
  workType?: string;
  availability?: string;
  dateOfJoining?: string;
  employmentType?: string;
  avatarPhotoUrl?: string;
  avatarInitials?: string;
  avatarText?: string;
  status?: string;
  isActive?: boolean;
  raw: Record<string, unknown>;
}

/**
 * Document structure for `/permission_templates/{designationId}` in `offsleek-shared-backend`.
 */
export interface FirestorePermissionTemplate {
  /** Firestore document ID in `/permission_templates/{designationId}` */
  id: string;
  designationId?: string;
  designation?: string;
  name?: string;
  title?: string;
  department?: string;
  description?: string;
  status?: string;
  isActive?: boolean;
  permissions?: Record<string, unknown> | string[];
  modules?: Record<string, unknown> | string[];
  workspaces?: Record<string, unknown> | string[];
  raw: Record<string, unknown>;
}

/**
 * Explicit audit trail of which Firestore documents were actually read and validated.
 * Ensures no record is ever claimed as loaded unless its Firestore `getDoc` succeeded and `exists()` was true.
 */
export interface IdentityResolutionAudit {
  userDocLoaded: boolean;
  userValidated: boolean;
  linkedEmployeeId: string | null;
  employeeDocLoaded: boolean;
  employeeValidated: boolean;
  linkedDesignationId: string | null;
  permissionTemplateAttempted: boolean;
  permissionTemplateLoaded: boolean;
  failureReason: IdentityFailureReason;
  errorCode: string | null;
  errorMessage: string | null;
}

export interface AuthContextType {
  /** High-level resolution status */
  authStatus: AuthResolutionStatus;
  /** True while initial Firebase Auth state or Firestore document reads are in flight */
  isLoading: boolean;
  /** True if a Firebase Auth user object is currently signed in (does NOT imply employee authorization) */
  isAuthenticated: boolean;
  /**
   * True ONLY when a Firebase user is signed in, `/users/{uid}` exists and has a valid active status & role,
   * AND `/internal_employees/{employeeId}` exists and has an active status.
   */
  isAuthorizedEmployee: boolean;
  /** True when no Firebase user is signed in and the app is running with existing local/demo workflows */
  isDemoMode: boolean;
  /** Raw Firebase Auth user object, or null if signed out */
  firebaseUser: User | null;
  /** Resolved `/users/{uid}` document if and only if the Firestore read succeeded and the document exists */
  userProfile: FirestoreUserProfile | null;
  /** Resolved `/internal_employees/{employeeId}` document if and only if the Firestore read succeeded and the document exists */
  employeeRecord: FirestoreInternalEmployee | null;
  /** Resolved `/permission_templates/{designationId}` document if and only if `designationId` was present and the document exists */
  permissionTemplate: FirestorePermissionTemplate | null;
  /** Detailed resolution state and error diagnostics */
  resolution: IdentityResolutionAudit;
  /** Re-runs Firestore document resolution for the currently signed-in Firebase user */
  refreshIdentity: () => Promise<void>;
  /** Signs out the current Firebase user and resets resolved Firestore records */
  signOutUser: () => Promise<void>;
}
