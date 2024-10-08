import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const SpeakerIcon = ({ ...props }: Props) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 3C9 3 7.5 7.5 5.5 8S3 9.395 3 10.5v3c0 1.105.5 2 2.5 2.5S9 21 12 21c2 0 2-18 0-18Z"
    />
  </Svg>
);

export { SpeakerIcon };
