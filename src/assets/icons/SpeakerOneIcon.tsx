import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const SpeakerOneIcon = ({ ...props }: Props) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16 9c.5.5 1 1.5 1 3s-.5 2.5-1 3M3 10.5v3c0 1.105.5 2 2.5 2.5S9 21 12 21c2 0 2-18 0-18-3 0-4.5 4.5-6.5 5S3 9.395 3 10.5Z"
    />
  </Svg>
);

export { SpeakerOneIcon };
