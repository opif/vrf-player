import { Svg, SvgProps } from './Svg';

interface Props extends SvgProps {}

const SpeakerIcon = ({ ...props }: Props) => (
  <Svg fill="currentColor" viewBox="0 0 56 56" {...props}>
    <path d="M39.73 49.504c1.594 0 2.743-1.172 2.743-2.742V9.379c0-1.57-1.149-2.883-2.79-2.883-1.148 0-1.921.516-3.163 1.688l-10.336 9.773a.918.918 0 0 1-.61.211h-6.96c-3.305 0-5.087 1.805-5.087 5.32v9.094c0 3.516 1.782 5.32 5.086 5.32h6.961c.235 0 .445.07.61.211l10.335 9.867c1.126 1.055 2.063 1.524 3.212 1.524Z" />
  </Svg>
);

export { SpeakerIcon };
