"use client";

import { RefObject } from "react";

export function useResumeExport(resumeRef: RefObject<HTMLDivElement | null>) {
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    // Create a hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '1000px';
    iframe.style.height = '1000px';
    iframe.style.border = '0';
    iframe.style.opacity = '0'; // Hide it visually
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const resumeContent = resumeRef.current.innerHTML;
    
    // Get all current styles to apply to the iframe
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(s => s.outerHTML)
      .join('\n');

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume Download</title>
          ${styles}
          <style>
            body { 
              margin: 0 !important; 
              padding: 0 !important; 
              background: white !important;
            }
            /* Ensure the container fills the page but stays within A4 */
            .print-container {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              color: black;
            }
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="print-container" style="padding: 40px; font-family: Arial, sans-serif;">
            ${resumeContent}
          </div>
          <script>
            // Wait for images and fonts to load
            window.onload = () => {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Remove the iframe after some time (after print dialog is handled)
    // We can't detect when print is finished in all browsers reliably, 
    // so we just wait a bit or keep it until next click.
    setTimeout(() => {
      // document.body.removeChild(iframe); 
      // Keeping it slightly longer to ensure print dialog is stable
    }, 5000);
  };

  const handleDownloadWord = () => {
    if (!resumeRef.current) return;
    
    const originalElement = resumeRef.current;
    const clone = originalElement.cloneNode(true) as HTMLElement;
    
    // Comprehensive list of styles to flatten for Word
    const stylesToFlatten = [
      'color', 'background-color', 'font-family', 'font-size', 'font-weight',
      'line-height', 'text-align', 'text-decoration', 'text-transform',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'border-top-style', 'border-top-width', 'border-top-color',
      'border-right-style', 'border-right-width', 'border-right-color',
      'border-bottom-style', 'border-bottom-width', 'border-bottom-color',
      'border-left-style', 'border-left-width', 'border-left-color',
      'width', 'height', 'display', 'vertical-align', 'list-style-type'
    ];

    const flattenStyles = (source: Element, target: HTMLElement) => {
      const computed = window.getComputedStyle(source);
      let inline = "";
      
      stylesToFlatten.forEach(prop => {
        const value = computed.getPropertyValue(prop);
        if (value && value !== 'initial' && value !== 'none') {
          // Handle layout conversion for Word
          if (prop === 'display' && (value.includes('flex') || value.includes('grid'))) {
            // Word doesn't do flex, but we can try to maintain some structure
            inline += `display: block; `;
          } else {
            inline += `${prop}: ${value}; `;
          }
        }
      });

      // Special fix: If it's a flex-item with a width percentage
      if (computed.display.includes('flex') || source.parentElement && window.getComputedStyle(source.parentElement).display.includes('flex')) {
        const width = computed.width;
        if (width.includes('%') || width.includes('px')) {
           inline += `float: left; width: ${width}; `;
        }
      }

      target.setAttribute('style', inline);
      target.removeAttribute('class'); // Crucial: Remove classes so Word doesn't get confused
    };

    // Flatten root
    flattenStyles(originalElement, clone);
    
    // Flatten all children
    const sourceAll = originalElement.querySelectorAll("*");
    const cloneAll = clone.querySelectorAll("*");
    
    for (let i = 0; i < sourceAll.length; i++) {
      flattenStyles(sourceAll[i], cloneAll[i] as HTMLElement);
    }

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          body { background-color: white; }
          /* Clearfix for floats */
          .group:after { content: ""; display: table; clear: both; }
        </style>
      </head>
      <body style="background-color: white;">
        <div style="width: 100%; background-color: white;">
          ${clone.innerHTML}
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { handleDownloadPDF, handleDownloadWord };
}
