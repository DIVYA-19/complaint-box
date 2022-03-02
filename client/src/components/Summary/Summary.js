import "./Summary.css";
import Grid from "@mui/material/Grid";

const Summary = () => {
  const firstSummary = {
    open: [
      {
        name: "total",
        count: "10k",
      },
      {
        name: "personal",
        count: "10k",
      },
      {
        name: "public",
        count: "10k",
      },
    ],
    closed: [
      {
        name: "total",
        count: "10k",
      },
      {
        name: "personal",
        count: "10k",
      },
      {
        name: "public",
        count: "10k",
      },
    ],
  };
  const secondSummary = [
    {
      name: "Total areas",
      count: 100,
      color: "hsl(205deg 25% 66%)",
    },
    {
      name: "high priority issues",
      count: 100,
      color: "hsl(11deg 85% 71%)",
    },
    {
      name: "low priority issues",
      count: 100,
      color: "hsl(180deg 67% 53%)",
    },
    {
      name: "complaints replied",
      count: 100,
      color: "hsl(205deg 26% 66%)",
    },
  ];
  return (
    <div id="container">
      <div id="summary">
        <Grid container>
          <Grid
            item
            md={5}
            xs={12}
            className="col1"
            style={{ backgroundColor: "#32005c" }}
          >
            <Grid container direction={"column"}>
              <Grid item xs={3}>
                <Grid container className="heading">
                  <Grid item xs={3}>
                    {" "}
                  </Grid>
                  <Grid item xs={3}>
                    total
                  </Grid>
                  <Grid item xs={3}>
                    personal
                  </Grid>
                  <Grid item xs={3}>
                    public
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container className="open-summary">
                  <Grid item xs={3} color='hsl(274deg 20% 64%)'>
                    open
                  </Grid>
                  {firstSummary.open.map((summary) => {
                    return (
                      <Grid item xs={3} key={summary.name}>
                        {summary.count}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container className="close-summary">
                  <Grid item xs={3} color='hsl(274deg 20% 64%)'>
                    closed
                  </Grid>
                  {firstSummary.closed.map((summary) => {
                    return (
                      <Grid item xs={3} key={summary.name}>
                        {summary.count}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
            className="col2"
            style={{ backgroundColor: "#fff" }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  {secondSummary.map((summary) => {
                    return (
                      <Grid
                        item
                        xs={3}
                        key={summary.name}
                        className="heading"
                        style={{ fontSize: "0.9rem", marginBottom: "10px" }}
                      >
                        {summary.name}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  {secondSummary.map((summary) => {
                    return (
                      <Grid
                        item
                        key={summary.name}
                        xs={3}
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: 600,
                          color: summary.color,
                        }}
                      >
                        {summary.count}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Summary;
