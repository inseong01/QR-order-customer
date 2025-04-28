import MainLanguage from './MainLanguage';

export default function LanguageButton() {
  return (
    <li className={'flex items-center gap-1 text-sm cursor-pointer relative'}>
      <MainLanguage />
    </li>
  );
}
