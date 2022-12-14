import F, { IconFamily, IconStyle, IconName, IconPack, IconPathData } from '@fortawesome/fontawesome-common-types';
// import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import camelCase from 'lodash/camelCase';

type IconDefinition = {
    name: IconName,
    styles: Partial<Record<IconStyle, IconFileDefinition>>;
}

type IconFileDefinition = {
    definition: F.IconDefinition,
    prefix: F.IconPrefix,
    iconName: F.IconName,
    height: number,
    width: number,
    svgPathData: string,
    unicode: string,
    aliases: (string | number)[],
    ligatures: (string | number)[],
}


export type IconProps = {
    name: IconName,
    style?: IconStyle
}

type SvgIconProps = {
    svg?: string
}


// export const Icon = Object.assign(function (props: IconProps & SvgIconProps) {
//     // return <SvgIcon {...props} />
//     return <div>icon {props.name}</div>
// }, {
//     /** Retrieves an icon component bound with the specified properties */
//     define<D extends IconDefinition>(icon: D) {
//         console.log(icon);
//         return function(props: any) {
//             return <div>
//                 icon {icon.name}
//             </div>
//         }
//     }
// })


export function Icon(icon: IconFileDefinition) {
    return function(props: any) {
        return <div>icon {icon.iconName}</div>
    }
}

