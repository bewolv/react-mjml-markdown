import marked from "marked";
import mjml2html from "mjml";

export default (req, res) => {
  const data = JSON.parse(req.body);

  const htmlOutput = mjml2html(
    `
      <mjml>
        <mj-head>
          <mj-style inline="inline">
            h1 { font-size: 28px; }
            h2 { font-size: 24px; }
            h3 { font-size: 20px; }
            p { font-size: 15px; }
            li { font-size: 15px; }
            code { font-size: 14px; }
            pre { 
              background-color: rgb(244, 247, 250);
              padding: 10px;
              border-radius: 4px;
            }
          </mj-style>
        </mj-head>
        <mj-body>
          <mj-section background-color="#f0f0f0">
            <mj-column>
              <mj-raw>
                ${marked(data.markdown)}
              </mj-raw>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `,
    {}
  );

  res.json({ html: htmlOutput.html });
};
