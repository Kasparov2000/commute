'use client'

import Image from 'next/image'
import {
    Avatar,
    Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader,
    Flex,
    Heading, HStack, Img,
    Input,
    InputGroup,
    InputRightElement, Stat, Text, StatNumber,
    VStack, Badge, Center, StatLabel, StatHelpText, useToast
} from "@chakra-ui/react";
import LoginButton from "@/components/LoginButton";
import {ArrowDownIcon, Icon, SearchIcon, StarIcon} from "@chakra-ui/icons";
import {
    BiCurrentLocation, BiTimeFive, BsThreeDots,
    BsThreeDotsVertical,
    FaBus,
    FaReceipt,
    FaRoad,
    GoLocation, GrSchedule,
    IoReceiptSharp, TbCurrentLocation
} from "react-icons/all";
import {memo, useDeferredValue, useEffect, useState} from "react";






export default function Home() {

    const [fieldOnFocus, setFieldOnFocus] = useState({startingPointFieldFocus: false, destinationPointFieldFocus: false})
    const [query, setQuery] = useState({startingPoint: null, destinationPoint: null});
    const [startLiveJourney, setLiveJourney] = useState(false)
    const [balance, setBalance] = useState(user.balance)
    const [liveJourneyDetails, setLiveJourneyDetails] = useState({busId: null, from: null, to: null, distance: null})
    const deferredQuery = useDeferredValue(query)
    const handleFieldFocus = ({field, bool}) => {
        if (fieldOnFocus[`${field}`] !== bool) {
            const newState = {...fieldOnFocus}
            newState[`${field}`] = bool
            setFieldOnFocus(newState)
        }

    }

    const handleQueryChange = ({field, value}) => {
        const newState = {}
        newState[`${field}`] = value
        setQuery((oldState) => ({...oldState, ...newState}))
    }
  return (
      <Flex>
          <VStack h={'100vh'} w={'40%'} alignItems={'space-around'} flexDir={'column'} p={3}>
              <Flex justifyContent={'space-between'} boxShadow={'md'} h={'157px'} w={{lg: '460px', sm: 'full'}} bg={"whatsapp.50"} rounded={'md'} p={3}  >
                  <VStack w={'20%'} mt={6}>
                      <Icon as={BiCurrentLocation} boxSize={6}/>
                      <Icon as={BsThreeDotsVertical} boxSize={6}/>
                      <Icon as={GoLocation} color={'red'} boxSize={6}/>
                  </VStack>
                  <Flex flexWrap={'wrap'} w={'full'}>
                      <InputGroup>
                          {
                              fieldOnFocus.startingPointFieldFocus
                              &&
                              <InputRightElement
                                  pointer='none'
                                  h={'60px'}
                                  children={<SearchIcon color='blue' boxSize={6}/>
                                  }
                              />
                          }

                          <Input
                              onFocus={() => handleFieldFocus({field: 'startingPointFieldFocus', bool: true})}
                              onBlur={() => handleFieldFocus({field: 'startingPointFieldFocus', bool: false})}
                              onChange={(e) => handleQueryChange({field: 'startingPoint', value: e.target.value})}
                              value={query.startingPoint}
                              h={'60px'}
                              w={'full'}
                              bg={'white'}
                              placeholder={'Starting Point'} />
                      </InputGroup>
                      <InputGroup>
                          {
                              fieldOnFocus.destinationPointFieldFocus
                              &&
                              <InputRightElement
                                  pointer='none'
                                  h={'60px'}
                                  children={<SearchIcon color='blue' boxSize={6}/>
                                  }
                              />
                          }

                          <Input
                              onFocus={() => handleFieldFocus({field: 'destinationPointFieldFocus', bool: true})}
                              onBlur={() => handleFieldFocus({field: 'destinationPointFieldFocus', bool: false})}
                              onChange={(e) => handleQueryChange({field: 'destinationPoint', value: e.target.value})}
                              value={query.destinationPoint}
                              h={'60px'}
                              w={'full'}
                              bg={'white'}
                              placeholder={'Destination'} />
                      </InputGroup>
                  </Flex>

              </Flex>
              <Flex w={{lg: '460px', sm: 'full'}} minH={'40px'}>
                  {
                      (deferredQuery.startingPoint && deferredQuery.destinationPoint)
                      &&
                      <SearchBusesOnRoute
                          setBalance={setBalance} setLiveJourney={setLiveJourney} route={{startingPoint: `${deferredQuery.startingPoint.trim().toLowerCase()}`,  destinationPoint: `${deferredQuery.destinationPoint.trim().toLowerCase()}`}}/>
                  }
              </Flex>


          </VStack>
          <Flex w={'full'} py={4} flexWrap={'wrap'}>
              <Flex h={'20%'} w={'full'} boxShadow={'md'} px={4} alignItems={'center'} justifyContent={'space-between'}>
                  <Box>
                      <Stat>
                          <StatLabel>Balance</StatLabel>
                          <StatNumber>rwf &nbsp;{user.balance}</StatNumber>
                      </Stat>
                  </Box>

                  <ButtonGroup w={'60%'} size={'sm'} justifyContent={'space-around'} h={'70%'} m={2}  colorScheme={'teal'} variant={'outline'} alignItems={'center'}>
                    <Button>Transactions</Button>
                    <Button>Trips</Button>
                    <Button>Deposit</Button>
                    <Button>Personalization</Button>
                  </ButtonGroup>
                    <Avatar
                        src={user.profilePic}
                        name={user.username}
                        size={'lg'}
                    />
              </Flex>
              {
                  startLiveJourney &&
                  <LiveJourney distance={4} setLiveJourney={setLiveJourney}/>
              }

          </Flex>

      </Flex>

  )
}


function nextJourney() {
    return (
        <Flex justifyContent={'space-between'}>
            <Heading>NEXT</Heading>
        </Flex>
    )
}
const LiveJourney = memo(function LiveJourney({distance, from, to, setLiveJourney}) {

   const [currentTime, setCurrentTime] = useState(0)
   const [travelled, setTravelled] = useState(0)
    const [journeyComplete, setJourneyComplete] = useState(false)

    const toast = useToast()

    let interval
    useEffect(() => {
        let distanceTravelled = 0
         interval = setInterval(() => {
            setCurrentTime((currentTime) => currentTime + 1)
             distanceTravelled = Math.round((distanceTravelled + 0.2) * 100) / 100
            setTravelled(curr => Math.round((curr + 0.2) * 100) / 100)
             if (distance === distanceTravelled) {
                 setJourneyComplete(true)
             }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (journeyComplete) {
        toast({
            description: "You have arrived at your destination.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setJourneyComplete(false)
        setLiveJourney(false)
        clearInterval(interval)
    }


    return (
        <Flex w={'full'} h={'75%'} boxShadow={'base'} flexW={'wrap'} p={2} gap={2}>
            <Box w={'60%'}>
                <Img src={'alu_kimironko.png'} h={'82%'} rounded={'md'}/>
            </Box>

            <Flex mx={'auto'} w={'40%'} h='30%' flexWrap={'wrap'} justifyContent={'space-around'} >
                <Box>
                    <Stat>
                        <StatLabel>Time</StatLabel>
                        <StatNumber>{currentTime} minutes</StatNumber>
                    </Stat>
                </Box>
                <Box>
                    <Stat>
                        <StatLabel>Travelled</StatLabel>
                        <StatNumber>{travelled} km</StatNumber>
                    </Stat>
                </Box>
                <VStack w={'full'} alignItems={'center'} justifyContent={'space-around'} w={'full'} >
                    <VStack>
                        <Icon as={TbCurrentLocation} boxSize={16} color={'whatsapp.700'}/>
                        <Text>{'kimironko'}</Text>
                    </VStack>
                    <VStack>
                        <Icon as={GoLocation} color={'red'} boxSize={16} color={'whatsapp.700'}/>
                        <Text>{'canal olympia'}</Text>
                    </VStack>

                </VStack>
            </Flex>
        </Flex>
    )
})
function SearchBusesOnRoute ({setLiveJourney, route: {startingPoint, destinationPoint}}) {
    const availableBuses = buses.filter(({possibleDestinations}) => {
        const firstFilteredPossibleDestinations = possibleDestinations.filter(({place}) => place.toLowerCase() === startingPoint )
        const secondFilteredPossibleDestinations= possibleDestinations.filter(({place}) => place.toLowerCase() === destinationPoint )

        return [...new Set([...firstFilteredPossibleDestinations, ...secondFilteredPossibleDestinations])].length === 2;

    })

    return(
        <Flex position='relative' flexDir={'column'} gap={2} alignItems='center' boxShadow={'md'} rounded={12}  w={{md: '35%', lg: 'full' }}  h={{lg: '100%'}} p={2} overflowY={'scroll'}>
            <HStack position={'absolute'} color={'blue'} w={'full'}>
                <Box w={'full'}>
                    <Stat>
                        <StatNumber fontSize={'sm'}>{availableBuses.length}</StatNumber>
                    </Stat>
                </Box>
            </HStack>
            {
                availableBuses.sort((a, b) => b.inTransit - a.inTransit).map(bus => <AvailableBus {...bus} setLiveJourney={setLiveJourney}/>)
            }
        </Flex>
    )
}

function AvailableBus(props) {
    return(
        <Flex w={'full'} py={6} rounded={'md'} position={'relative'} justifyContent={'center'} >
            <BusDetails {...props}/>
        </Flex>
    )
}

function BusDetails({imageUrl, imageAlt, capacity, passengers, route, formattedPrice, reviewCount, rating, inTransit, schedule, distanceAway, id: busId, speed, setLiveJourney, booked}) {
    const [timeLeft, setTimeLeft] = useState(null)
    const [isBooked, setIsBooked]  = useState(booked)

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date()
            const departureTime = new Date(schedule.departureTime)
            const timeDiff = Math.abs(departureTime.getTime() - currentTime.getTime())
            const SECONDS_LIMIT = 60_000
            const MINUTES_LIMIT = SECONDS_LIMIT * 60
            const HOURS_LIMIT = MINUTES_LIMIT * 24

            if (timeDiff < SECONDS_LIMIT) {
                setTimeLeft(`${timeDiff / 1000} seconds`)
                const secondsLeft = 60 - Math.ceil(timeDiff / 1000)
                const  unit = secondsLeft === 1 ? 'second' : 'seconds'
                setTimeLeft(`${secondsLeft} ${unit}`)
                return
            }
            if (timeDiff < MINUTES_LIMIT) {
                const minutesLeft = Math.ceil(timeDiff / SECONDS_LIMIT)
                const  unit = timeDiff === 1 ? 'min' : 'mins'
                const wholeMinutes = Math.floor(minutesLeft)
                const decimalMinutes = minutesLeft - wholeMinutes
                console.log({decimalMinutes})
                const seconds = Math.round(decimalMinutes * 60)
                setTimeLeft(`${minutesLeft} ${unit} ${seconds} sec`)
                return
            }

            if (timeDiff < HOURS_LIMIT) {
                const hoursLeft = timeDiff / MINUTES_LIMIT
                const  unit = timeDiff === 1 ? 'hr' : 'hrs'
                const wholeHours = Math.floor(hoursLeft)
                const decimalHours = hoursLeft - wholeHours
                const minutes = Math.round(decimalHours * 60)

                setTimeLeft(`${wholeHours} ${unit} ${minutes} mins`)
                return
            }

            const daysLeft = Math.ceil(timeDiff / HOURS_LIMIT)
            const  unit = timeDiff === 1 ? 'day' : 'days'
            setTimeLeft(`${daysLeft} ${unit}`)

        }, 1000)

        return _ => clearInterval(interval)
    }, [])

    const handleBookClick = () => {
        setIsBooked(true)
        buses[busId].booked = true
        user.balance = user.balance - formattedPrice
    }

    const departureTime = new Date(schedule.departureTime)
    const formattedDepartureDate = departureTime.toLocaleString('default', {month: 'short', day: 'numeric'})
    const formattedDepartureTime = departureTime.toLocaleString('en-US', {timeZone: 'Africa/Maputo', hour12: true, hour: 'numeric' , minute: '2-digit'})

    const arrivalTime = new Date(schedule.arrivalTime)
    const formattedArrivalDate = arrivalTime.toLocaleString('default', {month: 'short', day: 'numeric'})
    const formattedArrivalTime = arrivalTime.toLocaleString('en-US', {timeZone: 'Africa/Maputo', hour12: true, hour: 'numeric' ,minute: '2-digit'})



    return (
        <Flex  maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' flexWrap={'wrap'} px={1} >
            {inTransit && <Badge position={'absolute'} top={'2px'} colorScheme={'green'} variant='solid'>
                ACTIVE
            </Badge>}
            {/*<HStack w={'full'} justifyContent={'center'}>*/}
            {/*    <Icon as={FaRoad} boxSize={6}/>*/}
            {/*    <Box*/}
            {/*        mt='1'*/}
            {/*        fontWeight='semibold'*/}
            {/*        as='h2'*/}
            {/*        lineHeight='tight'*/}
            {/*        noOfLines={1}*/}
            {/*    >*/}
            {/*        {route}*/}
            {/*    </Box>*/}
            {/*</HStack>*/}
            <Center w={'35%'}>
                <Img src={imageUrl} alt={imageAlt} width={'full'}/>
            </Center>
            <Flex px='1' py={3} flexWrap={'wrap'} justifyContent={'center'} w={'63%'} >
                {
                    capacity === passengers
                    &&
                    <Center w={'full'}>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            FULL
                        </Badge>
                    </Center>

                }
                <Box display='flex' alignItems='baseline'>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='1'
                    >
                        passengers {passengers}  &bull; capacity {capacity}
                    </Box>
                </Box>
                <Center w={'full'}>
                    <Box>
                        <Stat>
                            <StatNumber fontSize={16}>
                                rwf {formattedPrice}
                            </StatNumber>
                        </Stat>
                    </Box>
                </Center>


                <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        {reviewCount} reviews
                    </Box>
                </Box>
                <></>
            </Flex>

            {
                !inTransit
                ?
                <HStack justifyContent={'space-around'} w={'full'}>
                    <Icon as={GrSchedule} boxSize={8}/>
                    <Box w={'23%'}>
                        <Stat>
                            <StatLabel>Departure</StatLabel>
                            <StatNumber fontSize={'md'}>{formattedDepartureTime}</StatNumber>
                            <StatHelpText>{formattedDepartureDate}</StatHelpText>
                        </Stat>
                    </Box>

                    <Box w={'23%'}>
                        <Stat>
                            <StatLabel>Arrival</StatLabel>
                            <StatNumber fontSize={'md'}>{formattedArrivalTime}</StatNumber>
                            <StatHelpText>{formattedArrivalDate}</StatHelpText>
                        </Stat>
                    </Box>
                    <VStack w={'25%'} justifyContent={'center'}>
                        <Icon as={BiTimeFive} boxSize={10}/>
                        <Box >
                            <Stat>
                                <StatNumber color={'whatsapp.900'} fontSize={'15px'} n>{timeLeft}</StatNumber>
                            </Stat>
                        </Box>
                    </VStack>
                </HStack>
                    :

                <InTransit busId={busId} distance={distanceAway} time={timeLeft} speed={speed} setLiveJourney={setLiveJourney}/>

            }

            <Center w={'full'} my={3}>
                {
                    !isBooked
                    ?
                        <Button colorScheme={'teal'} onClick={handleBookClick}>
                            book
                        </Button>
                    :
                        <Badge size={'lg'} variant={'solid'} colorScheme={'red'} >
                            Booked
                        </Badge>
                }

            </Center>
        </Flex>
    )
}

const InTransit = (function InTransit({distance, busId, speed, setLiveJourney}) {
    const [distanceRemaining, setDistanceRemaining] = useState(distance)
    const [timeRemaining, setTimeRemaining] = useState(Math.ceil(distance / speed * 60))
    const [parkingTimeRemaining, setParkingTimeRemaining] = useState(5)
    const [isParking, setIsParking] = useState(false)
    const [startParkingEffect, setStartParkingEffect] = useState(false)
    const toast = useToast()

    useEffect(() => {
        if (startParkingEffect) {
            let count = 5
            const interval = setInterval(() => {
                if (count > 2) {
                    setParkingTimeRemaining((parkingTimeRemaining) => parkingTimeRemaining - 1)
                    count --
                    setLiveJourney(true)
                }
                if (count === 0) {
                    buses[busId].disabled = true
                }
            }, 1000)


        }
        if (!isParking) {
            const interval = setInterval(() => {
                const newDistanceRemaining = Math.floor(speed * timeRemaining) / 100
                setDistanceRemaining(newDistanceRemaining)
                if (newDistanceRemaining === 0) {
                    setIsParking(true)
                    setStartParkingEffect(true)
                    return
                }
                setTimeRemaining((timeRemaining) => timeRemaining - 1)
            }, 1000)

            return () => {
                setTimeRemaining((timeRemaining) => timeRemaining)
                clearInterval(interval)
            }
        }


    }, [timeRemaining, startParkingEffect])

    return (
        <HStack w={'full'} justifyContent={'space-around'}>
            <Box w={'23%'}>
                <Stat>
                    <StatLabel>Distance</StatLabel>
                    <StatNumber fontSize={'md'}>{distanceRemaining} km</StatNumber>
                </Stat>
            </Box>
            <Box w={'23%'}>
                <Stat>
                    <StatLabel>Arrival</StatLabel>
                    <StatNumber fontSize={'md'}>{timeRemaining} mins</StatNumber>
                </Stat>
            </Box>
            {
                isParking
                &&
                <Box w={'23%'}>
                    <Stat>
                        <StatLabel>Parking</StatLabel>
                        <StatNumber fontSize={'md'}>{parkingTimeRemaining}</StatNumber>
                    </Stat>
                </Box>
            }
        </HStack>
    )
}
)

const buses = [
    {
        id: 0,
        imageUrl: '/bus.png',
        capacity: 54,
        passengers: 28,
        imageAlt: 'Bus ABC',
        route: 'ALU Campus - Kimironko Bus Park',
        possibleDestinations: [{place: 'ALU Campus', duration: 0},{place: 'Simba Supermarket Kimironko', duration: 4},{place: 'Gerard Residence', duration: 1}],
        formattedPrice: 400,
        reviewCount: 100,
        rating: 2,
        inTransit: false,
        schedule: {
        departureTime: '2023-04-23T16:30:00.000Z',
        arrivalTime: '2023-04-23T17:40:00.000Z'
        }
    },
    {
        id: 1,
        imageUrl: '/bus2.jpg',
        capacity: 54,
        passengers: 28,
        imageAlt: 'Bus ABC',
        route: 'Kimironko Bus Park - ALU Campus',
        possibleDestinations: [{place: 'ALU Campus', duration: 20},{place: 'Simba Supermarket Kimironko', duration: 20},{place: 'Gerard Residence', duration: 20}, {place: 'kimironko', duration: 20}],
        formattedPrice: 200,
        reviewCount: 100,
        booked: false,
        rating: 4,
        inTransit: false,
        distanceAway: 50,
        speed: 200,
        disabled: false,
        schedule: {
            departureTime: '2023-04-23T12:30:00.000Z',
            arrivalTime: '2023-04-23T12:35:00.000Z'
        },

    },
    {
        id: 2,
        imageUrl: '/bus3.jpg',
        capacity: 54,
        booked: false,
        passengers: 28,
        imageAlt: 'Bus ABC',
        route: 'Kimironko Bus Park - Rebero Bus Station',
        possibleDestinations: [{place: 'Canal Olympia', duration: 20}, {place: 'Kimironko', duration: 30}],
        formattedPrice: 400,
        reviewCount: 100,
        rating: 4,
        inTransit: true,
        distanceAway: 50,
        speed: 200,
        disabled: false,
        schedule: {
            departureTime: '2023-04-23T14:30:00.000Z',
            arrivalTime: '2023-04-23T16:40:00.000Z'
        },

    }

]

const routes = [
    {
        name: 'ALU Campus',
        possibleDestinations: [{place: 'ALU Campus', duration: 20},{place: 'Simba Supermarket Kimironko', duration: 20},{place: 'Gerard Residence', duration: 20}],
        price: 300
    },
    {
        name: 'Kimironko market - CDB',
        possibleDestinations: [{place: 'Kigali Heights', duration: 40}],
        duration: 20,
        price: 300
    },
]


const booked = [

]

const user = {
    username: 'Joseph Maison',
    firstName: 'Joseph',
    lastName: 'Maison',
    balance: 2400,
    profilePic: '/profilePic.jpg'
}
