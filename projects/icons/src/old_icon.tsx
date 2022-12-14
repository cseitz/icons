import { IconFamily, IconStyle, IconName, IconPack, IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';
// import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import camelCase from 'lodash/camelCase';

// import regular from '@cseitz/fontawesome-svg-regular';
// const regular = require('@cseitz/fontawesome-svg-regular');
const regular = {}

const packs = {
    regular,
}

console.log({ regular })

export type IconProps = {
    name: IconName,
    style?: IconStyle
}

type SvgIconProps = {
    svg?: string
}


export const OldIcon = Object.assign(function (props: IconProps & SvgIconProps) {
    return <SvgIcon {...props} />
}, {
    /** Retrieves an icon component bound with the specified properties */
    resolve<P extends IconProps>(icon: P) {
        // const def: IconDefinition = require('@cseitz/fontawesome-svg-regular/faHouse');
        // return function(props: Omit<IconProps & SvgIconProps, keyof P>) {
        //     console.log('yeyeye', _import)
        //     return <SvgIcon svg={_import.svgPathData} {...icon} {...props} />
        // }
    }
})

export function Icon<P extends IconProps>(icon: P) {
    // const _path = `@cseitz/fontawesome-svg-regular/fa${icon.name[0].toUpperCase() + camelCase(icon.name.slice(1))}`;
    const faName = `fa${icon.name[0].toUpperCase() + camelCase(icon.name.slice(1))}`;
    console.log(packs['regular']['faHouse']);
    // console.log(_path);
    // const def: IconDefinition & {
    //     svgPathData: string; //IconPathData
    // } = require(_path);
    // const result = import(_path);
    // console.log(result);
    const def = {} as any;
    return function (props: Omit<IconProps & SvgIconProps, keyof P>) {
        return <SvgIcon svg={def.svgPathData} {...icon} {...props} />
    }
}


function SvgIcon(props: IconProps & SvgIconProps) {
    const [svg, setSvg] = useState<string>();
    // useEffect(() => {
    //     if (props.svg) {
    //         props.svg.then(setSvg);
    //     }
    // }, []);
    // console.log({ svg })
    return <div>
        icon {props.name}
        <svg>
            {props.svg && <path d={props.svg} />}
        </svg>
    </div>
}