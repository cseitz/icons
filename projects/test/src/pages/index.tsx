import { Box, Button } from '@mantine/core';
import { Icon } from '@cseitz/icons';
import { faHouse } from '@cseitz/fontawesome-svg-regular/faHouse';
import { faHouseUser } from '@cseitz/fontawesome-svg-regular/faHouseUser';

const HouseIcon = Icon(faHouse);
const HouseUserIcon = Icon(faHouseUser);

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