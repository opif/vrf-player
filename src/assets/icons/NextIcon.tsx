import { Svg, SvgProps } from './Svg';

export interface NextIconProps extends SvgProps {}

const NextIcon = ({ ...props }: NextIconProps) => (
  <Svg fill="currentColor" viewBox="0 0 512 512" {...props}>
    <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm24.875 269.313-96 64A16.02 16.02 0 0 1 176 336a15.991 15.991 0 0 1-16-16V192a16.01 16.01 0 0 1 8.449-14.109c5.203-2.773 11.516-2.484 16.426.797l96 64c4.453 2.968 7.125 7.96 7.125 13.312s-2.672 10.344-7.125 13.313zM368 320c0 8.836-7.164 16-16 16h-16c-8.836 0-16-7.164-16-16V192c0-8.836 7.164-16 16-16h16c8.836 0 16 7.164 16 16v128z" />
  </Svg>
);

export { NextIcon };
