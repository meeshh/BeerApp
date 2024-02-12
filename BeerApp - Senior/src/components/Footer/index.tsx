import { grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: grey[400],
        width: '100%',
        padding: 16
      }}
    >
      <div style={{textAlign: 'center'}}>&#169; {new Date().getFullYear()} </div>
    </footer>
  );
};

export default Footer;
