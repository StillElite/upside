export interface HeaderProps {
  text: string;
}

export const Header = ({ text }: HeaderProps) => {
  return (
    <header className='bg-[#e4e5e9] p-8'>
      <h1 className='text-[#1c2b3d] text-4xl font-semibold'>{text}</h1>
    </header>
  );
};
