// @flow
import * as React from "react";
export default function NotFound(): React.Node{

    function foo(x: ?string): string {
        if (x) {
            return x;
        }
        return "default string";
    }

    return <div>{foo('25')}</div>
}
