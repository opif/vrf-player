import styled from "styled-components";

import { ServerTimestamp } from "api/types";
import { formatTimestamp } from "common/utils";

interface Props {
    dateTime: ServerTimestamp;
}

const _Time = ({dateTime, ...rest}: Props) => <time {...rest} dateTime={dateTime}>{formatTimestamp(dateTime)}</time>;

const Time = styled(_Time)`
    word-break: break-word;
    font-style: italic;
    text-align: right;
    font-size: 16px;
`;

export { Time }
