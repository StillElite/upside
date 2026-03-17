export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className='bg-[#e4e5e9] p-8'>
      <h1 className='text-[#1c2b3d] text-4xl font-semibold'>{title}</h1>
    </div>
  );
};
