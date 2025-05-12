import React from 'react';
import styled from 'styled-components';
import { Download } from 'lucide-react';

interface ResumeButtonProps {
  text: string;
  href: string;
  className?: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({ text, href, className }) => {
  return (
    <StyledWrapper className={className}>
      <div className="btn-conteiner">
        <a className="btn-content" href={href} target="_blank" rel="noopener noreferrer">
          <span className="btn-title">{text}</span>
          <span className="icon-download">
            <Download size={24} />
          </span>
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-conteiner {
    display: flex;
    justify-content: center;
  }

  .btn-content {
    display: flex;
    align-items: center;
    padding: 8px 24px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    background: #ffffff;
    transition: all 0.5s ease;
    border-radius: 100px;
    box-shadow: 0 0 0.2em 0 rgba(0, 0, 0, 0.1);
    border: 2px solid #000000;
  }

  :global(.dark) .btn-content {
    color: #ffffff;
    background: #000000;
    border-color: #ffffff;
    box-shadow: 0 0 0.2em 0 rgba(255, 255, 255, 0.1);
  }

  .btn-content:hover, .btn-content:focus {
    transition: 0.5s;
    -webkit-animation: btn-content 1s;
    animation: btn-content 1s;
    outline: 0.1em solid transparent;
    outline-offset: 0.2em;
    box-shadow: 0 0 0.4em 0 rgba(0, 0, 0, 0.2);
    background: #ffffff;
    
  }

  :global(.dark) .btn-content:hover, 
  :global(.dark) .btn-content:focus {
    box-shadow: 0 0 0.4em 0 rgba(255, 255, 255, 0.2);
    background: #ffffff;
    color: #000000;
  }

  .btn-content .icon-download {
    transition: 0.5s;
    margin-left: 8px;
    opacity: 0.8;
  }

  .btn-content:hover .icon-download {
    transition: 0.5s;
    transform: translateY(2px);
    opacity: 1;
  }

  /* Button animations */
  @-webkit-keyframes btn-content {
    0% {
      outline: 0.2em solid rgba(0, 0, 0, 0.1);
      outline-offset: 0;
    }
  }

  @keyframes btn-content {
    0% {
      outline: 0.2em solid rgba(0, 0, 0, 0.1);
      outline-offset: 0;
    }
  }

  :global(.dark) {
    @-webkit-keyframes btn-content {
      0% {
        outline: 0.2em solid rgba(255, 255, 255, 0.1);
        outline-offset: 0;
      }
    }

    @keyframes btn-content {
      0% {
        outline: 0.2em solid rgba(255, 255, 255, 0.1);
        outline-offset: 0;
      }
    }
  }
`;

export default ResumeButton; 