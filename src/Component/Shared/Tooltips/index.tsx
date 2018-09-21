import * as React from 'react';

interface ITooltipsProps {
    hoverText: string;
    tooltipsText: string;
}

export default (props: ITooltipsProps) => (
    <div className="Tooltips">
        {props.hoverText}
        <span className="Tooltips__Text">{props.tooltipsText}</span>
    </div>
);
