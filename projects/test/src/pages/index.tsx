import { Box, Button } from '@mantine/core';
import { Icon, Icon2 } from '@cseitz/icons';

import house from '@cseitz/icons-regular/house';
import houseUser from '@cseitz/icons-regular/house-user';

const HouseIcon = Icon(house);
const HouseUserIcon = Icon(houseUser);

const PlusIcon = Icon2('@cseitz/icons-regular/plus');

// const HouseIcon = Icon({
//     name: 'house',
// })

// const PlusIcon = Icon({
//     name: 'plus',
// })

export default function Homepage() {
    return <Box>
        <Button>heya</Button>
        {/* <PlusIcon /> */}
        <HouseIcon />
        <HouseUserIcon />
        {/* <svg>
            <path d={faHouse.icon[4]} />
        </svg> */}
    </Box>
}