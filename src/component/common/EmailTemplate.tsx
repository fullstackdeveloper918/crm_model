import React from 'react'
import firstEmailImg from "../../assests/images/Emial1stImage.png"
import secondEmailImg from "../../assests/images/email2nddImg  (1).png"
import thirdEmailImg from "../../assests/images/email3rddImg.png"
import logo from "../../assests/images/OxygenLogo.jpg"
const EmailTemplate = ({emailTemplate}:any) => {
  return (
    <div>
 {/* <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f6f6f6' }}> */}
      <table
    
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderCollapse: 'collapse',
          border: '1px solid #ddd'
        }}
      >
        <tbody  style={{ padding: '20px', display: 'grid' }}>
          <tr>
            <td
              colSpan={2}
              style={{ padding: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333', paddingLeft:"200px"}}
            >
              <h1 style={{ margin: '5px 0 0', fontSize: '26px' , borderBottom:"10px"  }}>{emailTemplate} Template</h1>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{ padding: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}
            >
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Hii</p>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{
                padding: '15px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333',
                paddingTop: '0'
              }}
            >
              <p style={{ marginBottom: '0' }}>
                Our OxyAir 32 chamber has 7 windows and is available with either 1.3 ATA, 1.4 ATA, or 1.5 ATA.
              </p>
              <img
                src={firstEmailImg.src}
                alt="img"
                style={{ width: '100%' }}
                height={358}
                width={542}
              />
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{
                padding: '15px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333',
                paddingTop: '0'
              }}
            >
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>
                90% of clinics want to use our dual-action air conditioning system, and we are the only vendor to offer these advanced features. However, most home users would be OK with the AC unit unless they live in a hot and humid climate. We also have silent pressure valves and an interior frame. Our system is aesthetically pleasing compared to some of our competitors, and we provide an oxygen generator with our system as an inclusive feature.
              </p>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{
                padding: '15px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333',
                paddingTop: '0'
              }}
            >
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>
                <strong>[]Product Brochure</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{
                padding: '15px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333',
                paddingTop: '0'
              }}
            >
              <a
                href="https://drive.google.com/file/d/1NnywLSjRylXEY2rh30EmqO00YS0sBQQB/view"
                style={{ color: 'rgb(17,85,204)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://drive.google.com/file/d/1NnywLSjRylXEY2rh30EmqO00YS0sBQQB/view
              </a>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{
                padding: '15px 15px 0',
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#333',
                paddingTop: '0'
              }}
            >
              <h2 style={{ marginBottom: '0',fontSize: '18px', }}>
                <b>Enclosed are just a few reasons to Purchase from Oxygen Health Systems.</b>
              </h2>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{ padding: '0 15px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}
            >
              <ul
                style={{
                  listStyle: 'auto',
                  fontSize: '14px',
                  paddingLeft: '18px',
                  marginTop: '5px'
                }}
              >
                <li>More durable bladders with higher capable pressures.</li>
                <li>Many more ergonomic options with conducive spaces to fit your specific needs.</li>
                <li>Designs with simpler and easier entry and exit.</li>
                <li>Overall quieter operation of the chamber from multiple aspects (Quieter Compressor, Silent pressure release valves).</li>
                <li>Provides critical comfort requirements with dual-action air conditioning and an upgrade path to this option.</li>
                <li>The turnkey/complete system is ready to use, and a 10 LPM oxygen generator is included.</li>
                <li>Dehumidifier and ionizer included.</li>
                <li>Designed to deliver the highest-caliber, spacious experience, our Hyperbaric Chambers have additional windows that make it comfortable for even those with claustrophobia. Our chambers have more head space than an airplane and can often fit more than one person inside!</li>
                <li>Our wide selection of Hyperbaric Chambers is intended to service post-op, wheelchair, and patients in need of special assistance, ensuring that all patient types are able to enter and exit much easier than traditional chambers.</li>
                <li>Our Hyperbaric Chambers come with a memory foam mattress and a separate recliner in our sitting chamber, which allows patients the option to lie down or sit up for complete comfort.</li>
                <li>Our chamber includes an air conditioning unit that allows patients to stay at a comfortable temperature during their treatment.</li>
                <li>A 3-year warranty works to resolve your issues in a timely manner, manned in the USA with Engineers to answer your questions and service your needs.</li>
                <li>Best pricing in the Industry with more features available.</li>
                <li>Many financing plans are available to fit your needs and to make your purchase a reality.</li>
                <li>A 5 Star 😃 Review Rating on Google shows an extreme satisfaction level.</li>
                <li>AI-based Business marketing system to jumpstart your business.</li>
                <li>Video and Remote Training on Chamber operation.</li>
                <li>Business intake forms and additional local marketing brochures.</li>
                <li>While other companies rely on technology from the 1990s with virtually no upgrades, our products have consistently improved over time, allowing us to leapfrog our competition in features while being extremely competitive on pricing.</li>
                <li>Upgrade path - Purchase your system as AC-ready and you have an upgrade path to our dual-action Air conditioning system.</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{ padding: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}
            >
              <img
                src={secondEmailImg.src}
                alt="image.png"
                style={{ marginRight: '25px' }}
              />
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{ padding: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}
            >
              <img
                src={thirdEmailImg.src}
                alt="image.png"
                style={{ maxWidth: '563px', maxHeight: '437px' }}
              />
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              style={{ padding: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}
            >
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Thanks and regards</p>
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Michael Carroll</p>
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>
                Oxygen Health Systems/ Hyperbaric Pro LLC
              </p>
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>630-452-8431</p>
              <a href="" style={{ color: 'rgb(17,85,204)' }} target="_blank" rel="noopener noreferrer">
                <span style={{ verticalAlign: 'inherit' }}>Sales@oxygenHealthSystems.com</span>
              </a>
              <p>
                <img
                  height="39"
                  width="72"
                  alt="Oxygen logo small.gif"
                  src={logo.src}
                  style={{ marginRight: '0px' }}
                />
              </p>
              <p>
                Please send all support requests to{' '}
                <a href="" style={{ color: 'rgb(17,85,204)' }}>
                  support@oxygenhealthsystems.com
                </a>
              </p>
              <p style={{ fontSize: '11px' }}>
                The information contained in this message and any attachments is intended only for the use of the individual or entity to which it is addressed, and may contain information that is PRIVILEGED, CONFIDENTIAL, and exempt from disclosure under applicable law. If you are not the intended recipient, you are prohibited from copying, distributing, or using the information. Please contact the sender immediately by return e-mail and delete the original message from your system.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    {/* </body> */}
        
    </div>
  )
}

export default EmailTemplate