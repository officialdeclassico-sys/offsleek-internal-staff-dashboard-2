import React from 'react';
import { Plus } from 'lucide-react';
import { RequestIcon } from './RequestIcons';
import { useRequest } from '../context/RequestContext';
import { RequestCategory } from '../types/request';

interface CardConfig {
  category: RequestCategory;
  title: string;
  description: string;
  buttonLabel: string;
}

const CARDS: CardConfig[] = [
  {
    category: 'Leave',
    title: 'Leave Request',
    description: 'Apply for casual, sick, personal or other leaves.',
    buttonLabel: 'Apply for Leave',
  },
  {
    category: 'Salary Slip',
    title: 'Salary Slip',
    description: 'Request your monthly or past salary slips.',
    buttonLabel: 'Request Salary Slip',
  },
  {
    category: 'Document',
    title: 'Document Request',
    description: 'Request offer letter, experience letter, or other official documents.',
    buttonLabel: 'Request Document',
  },
  {
    category: 'Access',
    title: 'Access Request',
    description: 'Request system or tool access (e.g., email, software, accounts).',
    buttonLabel: 'Request Access',
  },
  {
    category: 'Other',
    title: 'Other Request',
    description: 'Any other HR or admin support you need.',
    buttonLabel: 'Raise a Request',
  },
];

export const RequestTypeCards: React.FC = () => {
  const { openCreateModal } = useRequest();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {CARDS.map((card) => (
        <div
          key={card.category}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs hover:border-gray-300 transition-all flex flex-col justify-between"
        >
          {/* Card Top: Icon, Title, Description */}
          <div>
            <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-black mb-3.5">
              <RequestIcon category={card.category} className="w-5.5 h-5.5 text-black" />
            </div>

            <h3 className="font-bold text-base text-gray-900 tracking-tight">
              {card.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
              {card.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => openCreateModal(card.category)}
              className="w-full py-2.5 px-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{card.buttonLabel}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
