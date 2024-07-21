import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const DownloadIcon = ({ ...props }: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 16V8M9 13l2.913 2.913v0a.123.123 0 0 0 .174 0v0L15 13"
    />
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"
    />
  </Svg>
);

export { DownloadIcon };
