import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const PlayIcon = ({ ...props }: Props) => (
  <Svg fill="currentColor" viewBox="0 0 512 512" {...props}>
    <path d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256 256-114.615 256-256S397.383 0 256 0zm88.48 269.57-128 80a16.008 16.008 0 0 1-16.238.422A15.994 15.994 0 0 1 192 336V176c0-5.82 3.156-11.172 8.242-13.992a15.957 15.957 0 0 1 16.238.422l128 80c4.676 2.93 7.52 8.055 7.52 13.57s-2.844 10.641-7.52 13.57z" />
  </Svg>
);

export { PlayIcon };
