import "./App.css";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const fourRandomIndex = [];
  const fetchCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountriesData(response.data);
  };
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * countriesData.length + 1);
    if (!fourRandomIndex.includes(randomIndex)) {
      fourRandomIndex.push(randomIndex);
    }
  }
  const FirstFourCountries = fourRandomIndex.map((idx) => countriesData[idx]);
  useEffect(() => {
    fetchCountries();
  }, []);
  console.log(fourRandomIndex);

  return (
    <div className="App">
      <Flex
        color={"white"}
        fontSize={"30px"}
        fontWeight={"bold"}
        justifyContent={"center"}
        width={"100%"}
      >
        RANDOM COUNTRIES IN THE WORLD 🌍
      </Flex>
      <Flex gap={"10px"} paddingTop={"20px"} justifyContent={"center"}>
        {FirstFourCountries.map((val) => {
          return (
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={val?.flags?.png}
                  alt={val?.name?.common}
                  borderRadius="lg"
                  border={"2px solid black"}
                  maxH={"200px"}
                  h={"200px"}
                  maxW={"350px"}
                  w={"310px"}
                />
                <Stack mt="6" spacing="1">
                  <Heading size="md" paddingBottom={"10px"}>
                    {val?.name?.common}
                  </Heading>
                  {val?.continents && val.continents.length > 0 && (
                    <Text>Continent : {val?.continents[0]} 🗺️</Text>
                  )}

                  <Text>Area : {val?.area.toLocaleString("id-ID")} km²</Text>
                  <Text>
                    Population : {val?.population.toLocaleString("id-ID")}{" "}
                    👨‍🤝‍👩
                  </Text>
                  {val?.capital && val.capital.length > 0 && (
                    <Text>Capital : {val?.capital[0]} 🏛️ </Text>
                  )}
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <a
                    href={val?.maps?.openStreetMaps}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="solid" colorScheme="blue">
                      Maps
                    </Button>
                  </a>
                  <a
                    href={val?.maps?.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="ghost" colorScheme="blue">
                      Direction
                    </Button>
                  </a>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
      <Flex padding={"20px"}>
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </Flex>
    </div>
  );
}

export default App;
