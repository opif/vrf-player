import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const StopIcon = ({ ...props }: Props) => (
  <Svg fill="currentColor" viewBox="0 0 512 512" {...props}>
    <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm80 320c0 8.837-7.163 16-16 16H192c-8.837 0-16-7.163-16-16V192c0-8.837 7.163-16 16-16h128c8.837 0 16 7.163 16 16v128z" />
  </Svg>
);

export { StopIcon };
