export interface PanelCardProps {
  title: string;
  children: React.ReactNode;
}

export const PanelCard = ({ title, children }: PanelCardProps) => {
  return (
    <section
      className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm text-[#1c2b3d]'
      aria-labelledby={`${title}-heading`}
    >
      <div className='mb-4 border-b border-gray-300'>
        <h2 id={`${title}-heading`} className='text-lg font-semibold'>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
};
