import './BackgroundImage.css';

function BackgroundImage(props) {
  const src = props.src;

  return (
    <img className="BackgroundImage" src={src} alt="" />
  );
}

export default BackgroundImage;
