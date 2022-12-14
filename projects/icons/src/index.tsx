import { IconName, IconDefinition, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';


type IconFileDefinition = {
    definition: IconDefinition,
    prefix: IconPrefix,
    iconName: IconName,
    height: number,
    width: number,
    svgPathData: string,
    unicode: string,
    aliases: (string | number)[],
    ligatures: (string | number)[],
}


export function Icon(icon: IconDefinition | IconFileDefinition) {
    return function (props: Omit<FontAwesomeIconProps, 'icon'> & {
        sx?: FontAwesomeIconProps['style'],
    }) {
        let { className, sx, style, scale = '1em', ..._props } = props;
        const def: IconDefinition = (icon as any)?.definition || icon;
        return <FontAwesomeIcon className={'fa icon ' + (className || '')} icon={def} style={{
            height: scale,
            verticalAlign: '-0.125em',
            ...style,
            ...sx,
        }} {..._props} />
    }
}
