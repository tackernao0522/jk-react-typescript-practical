import { VFC } from "react";

type Props = {
    color: string;
    fontSize: string;
};

// FCという型は暗黙的にchildrenを受けられるようになっているのでVFCを使用した方が良い。React ver18からはFCでも暗黙的にchildrenが含まれなくなる
export const Text: VFC<Props> = (props) => {
    const { color, fontSize } = props;
    return <p style={{ color, fontSize }}>テキストです</p>
}
