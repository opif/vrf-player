import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const SpeakerDisabledIcon = ({ ...props }: Props) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5 8.143c-1.585.518-2 1.35-2 2.357v3c0 1.105.5 2 2.5 2.5S9 21 12 21c.61 0 1.034-1.674 1.272-4M3 3l18 18M9 4.608C9.846 3.715 10.804 3 12 3c.774 0 1.248 2.695 1.423 6"
    />
  </Svg>
);

export { SpeakerDisabledIcon };
