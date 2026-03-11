import { Children } from 'react';

export interface PanelCardProps {
  title: string;
  children: React.ReactNode;
}

export const PanelCard = ({ title, children }: PanelCardProps) => {
  return (
    <>
      <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm text-[#2a3b4c]'>
        <div className='mb-4 border-b border-gray-300'>
          <h2 className='text-lg font-semibold'>{title}</h2>
        </div>
        {children}
      </div>
    </>
  );
};
