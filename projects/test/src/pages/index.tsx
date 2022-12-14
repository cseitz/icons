import { Box, Button, Sx } from '@mantine/core';
import { Icon } from '@cseitz/icons';

import { faHouse } from '@cseitz/icons-solid/house';
import { faHouseUser} from '@cseitz/icons-regular/house-user';
import { faPlus } from '@cseitz/icons-regular/plus'


const HouseIcon = Icon(faHouse);
const HouseUserIcon = Icon(faHouseUser);
const PlusIcon = Icon(faPlus);

// const PlusIcon = Icon2('@cseitz/icons-regular/plus');

// const HouseIcon = Icon({
//     name: 'house',
// })

// const PlusIcon = Icon({
//     name: 'plus',
// })

export default function Homepage() {
    return <Box>
        <Button leftIcon={<HouseIcon />}>heya</Button>
        <PlusIcon />
        <HouseIcon />
        <HouseUserIcon scale={'2em'} />
        {/* <svg>
            <path d={faHouse.icon[4]} />
        </svg> */}
    </Box>
}