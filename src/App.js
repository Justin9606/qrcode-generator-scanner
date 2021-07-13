import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Container,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import useLocalStorage from "./useLocalStorage";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const classes = useStyles();
  const qrRef = useRef(null);
  const [input, setInput] = useLocalStorage("input", "");
  const [imgUrl, setImgUrl] = useLocalStorage("imgUrl", "");
  const [scan, setScan] = useLocalStorage("scan", "");
  const [scanWebCam, setScanWebCam] = useLocalStorage("scanWeb", "");

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(input);
      setImgUrl(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleErrorFile = (err) => {
    console.log(err);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScan(result);
    }
  };

  const handleErrorWebCam = (err) => {
    console.log(err);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanWebCam(result);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  useEffect(() => {}, [input, imgUrl]);

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>QR Code Generator</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={generateQrCode}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imgUrl && <img src={imgUrl} alt="QR Code" />}
              <br />

              {imgUrl ? (
                <a href={imgUrl} download className={classes.linkDownload}>
                  <Button variant="outlined" color="secondary">
                    Download
                  </Button>
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                variant="contained"
                color="secondary"
                className="classes.btn"
                style={{ marginTop: 10, marginBottom: 10 }}
                onClick={onScanFile}
              >
                Scan QRCode
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                stle={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scaned Code: {scan}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned by Web Cam: {scanWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    background: "#3f51b5",
    color: "white",
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkDownload: {
    textDecoration: "none",
  },
}));
export default App;
