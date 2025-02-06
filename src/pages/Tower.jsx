import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import {
  t1_t2_frames_svg,
  t3_t4_frames_svg,
  t5_t6_frames_svg,
} from "../svgs/towers";

// Helper function to generate image paths based on the tower ID
const getImagePaths = (towerId) => {
  const basePath = `/iso/towers/${towerId}`;
  return Array.from({ length: 15 }, (_, i) => `${basePath}/${i}.png`);
};

// Helper function to get the appropriate SVG frames based on the tower ID
const getSvgFrames = (towerId) => {
  console.log("Fetching SVG frames for tower ID:", towerId);
  switch (towerId) {
    case "t1_t2":
      return t1_t2_frames_svg;
    case "t3_t4":
      return t3_t4_frames_svg;
    case "t5_t6":
      return t5_t6_frames_svg;
    default:
      return [];
  }
};

// Helper function to map tower IDs
const mapTowerId = (id) => {
  
  const mapping = {
    'T1': 't1_t2',
    'T2': 't1_t2',
    'T3': 't3_t4',
    'T4': 't3_t4',
    'T5': 't5_t6',
    'T6': 't5_t6'
  };
  return mapping[id] || id;
};

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
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const SVGContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
`;

const SVGPath = styled.path`
  pointer-events: all;
  cursor: pointer;
  fill: green;
  fill-opacity: 0.48;
  stroke: white;
  stroke-width: 2;
  transition: fill-opacity 0.3s ease;

  &:hover {
    fill-opacity: 1;
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 3;
  pointer-events: none;
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
  cursor: pointer;
  transition: background-color 0.3s;
  pointer-events: all;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// Add Navbar styled components
const Navbar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
`;

const NavbarButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "none" : "rgba(255, 255, 255, 0.2)")};
  }
`;

const Tower = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Map the tower ID
  const mappedTowerId = mapTowerId(id);
  console.log("Mapped Tower ID:", mappedTowerId);

  // Get the correct SVG frames based on mapped ID
  const svgFrames = getSvgFrames(mappedTowerId);

  // Use the mapped ID for images
  const images = getImagePaths(mappedTowerId);

  // Get current SVG frame
  const currentSvgFrame = svgFrames[currentImageIndex];

  // Check if SVG frame exists and has the expected structure
  if (!currentSvgFrame || !currentSvgFrame.props || !currentSvgFrame.props.children) {
    console.log("Current SVG frame:", currentSvgFrame);
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  const handlePathClick = (event) => {
    const mappedTowerId = event.currentTarget.getAttribute('data-tower');
    const floorId = event.currentTarget.getAttribute('data-floor');
    console.log("Clicked Tower ID:", mappedTowerId);
    console.log("Clicked Floor ID:", floorId);

    // Navigate to a new route based on the mappedTowerId and floorId
    navigate(`/tower/${mappedTowerId}/floor/${floorId}`);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container>
      <ImageContainer>
        {/* Add Navbar */}
        <Navbar>
          <NavbarButton onClick={() => navigate("/")}>Sector 66</NavbarButton>
          <NavbarButton disabled>{`Tower ${id}`}</NavbarButton>
          <NavbarButton onClick={() => navigate("/")}>⬅</NavbarButton>
        </Navbar>

        <SVGContainer 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="none"
        >
          <image
            xlinkHref={images[currentImageIndex]}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ objectFit: 'fill' }}
          />

          {React.Children.map(currentSvgFrame.props.children, (group) => (
            group && React.Children.map(group.props.children, (subGroup) => (
              subGroup && React.Children.map(subGroup.props.children, (path) => (
                path && path.type === 'path' && (
                  <SVGPath
                    key={path.props.id}
                    d={path.props.d}
                    id={path.props.id}
                    data-tower={id}
                    data-floor={subGroup.props.id}
                    onClick={handlePathClick}
                  />
                )
              ))
            ))
          ))}
        </SVGContainer>

        <NavigationContainer>
          <NavigationButton onClick={handlePrevious}>&lt;</NavigationButton>
          <NavigationButton onClick={handleNext}>&gt;</NavigationButton>
        </NavigationContainer>
      </ImageContainer>
    </Container>
  );
};

export default Tower;