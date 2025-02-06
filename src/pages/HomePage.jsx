import { useState } from "react";
import styled from "styled-components";
import { project_svgs } from "../svgs/project.js";
import { useNavigate } from "react-router-dom";

const images = [
  "/iso/project/0.png",
  "/iso/project/1.png",
  "/iso/project/2.png",
  "/iso/project/3.png",
];

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(119, 209, 239);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const SVGContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

const SVGPath = styled.path`
  pointer-events: all;
  cursor: pointer;
  fill: rgba(0, 255, 0, 0);
  transition: fill 0.3s ease;

  &:hover {
    fill: rgba(0, 255, 0, 0.5);
  }
`;

const Navbar = styled.div`
  position: absolute;
  height: 30px;
  top: 25px;
  left: 25px;
  background-color: rgba(26, 25, 25, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 5;
`;

const NavbarButton = styled.button`
  background: white;
  height: 30px;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const NavigationButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: none;
  padding: 0;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: white;
  font-size: 16px;
`;

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlePathClick = (key) => {
    // Navigate to a new route with the selected SVG's key as a parameter
    navigate(`/tower/${key}`); // Example: /towers/T1 or /towers/T2
  };

  return (
    <Container>
      <ImageContainer>
        {/* Navbar in the top-left corner */}
        <Navbar>
          <NavbarButton>Sector 66</NavbarButton>
        </Navbar>

        {/* SVG Overlay */}
        <SVGContainer viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Background Image Inside SVG */}
          <image
            xlinkHref={images[index]}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice" // Ensures the image covers the entire SVG
          />

          {/* Interactive SVG Paths */}
          {Object.entries(project_svgs[index]).map(([key, path]) => (
            <SVGPath
              key={key}
              d={path}
              onClick={() => handlePathClick(key)} // Pass the key (SVG name) to handlePathClick
              onMouseEnter={(e) => {
                e.currentTarget.style.fill = "rgba(0, 255, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fill = "rgba(0, 255, 0, 0)";
              }}
            />
          ))}
        </SVGContainer>

        {/* Navigation */}
        <NavigationContainer>
          <NavigationButton onClick={prevImage}>←</NavigationButton>
          <NavigationButton onClick={nextImage}>→</NavigationButton>
        </NavigationContainer>

        {/* Optional Counter */}
        {/* <Counter>
          {index + 1} / {images.length}
        </Counter> */}
      </ImageContainer>
    </Container>
  );
}