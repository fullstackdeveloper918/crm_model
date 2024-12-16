"use client"
import React from 'react'

const WelcomeTemplate = () => {
  return (
    <div className="container email_welcome">
      <div className="logo">
        <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png" alt="cc-logo" />
      </div>
      <div className="illustration">
        <div className="hgroup">
          <span className="name">Hello, John Doe</span>
          <h1>Thank you for Signing Up</h1>
          <div className="thumbs">
            <a href="https://imgbb.com/">
              <img src="https://i.ibb.co/2g7tS2d/good.png" alt="good" />
            </a>
          </div>
          <p className="rad">Rad stuff is here</p>
        </div>
      </div>

      <div className="hgroup">
        <>
          Placeholder aims at solving all lending problems in Africa. We built a platform to support the lenders' community with high-quality, cost-conscious assets like: the web plugin, mobile app, chatbot, sophisticated credit analysis, bank statement analysis, and more. These products live on a site packed with the best practices and shared knowledge resources from our team to you.
          <br />
          <p>
            <span className="raised">Hold up, there's more!</span>
            A 7-day simulation trial, your trial starts now.
          </p>
          <p>If you have any questions, kindly reach out to our team at support@placeholder.com.</p>

          <p>Have an AWESOME day! Brought to you by your friends at Placeholder.</p>
        </>
      </div>

      <div className="button-wrap">
        <button className="explore">
          Explore
        </button>
      </div>
      <p>
        Brand Name Inc © 2024
        <br />
        Somewhere on Earth.
        <br />
        Tel: 00 1 460 5416
      </p>
    </div>
  );
}

export default WelcomeTemplate;
