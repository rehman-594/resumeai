import { jsPDF } from "jspdf";
console.log("Named import jsPDF:", typeof jsPDF);
import defaultExport from "jspdf";
console.log("Default export:", typeof defaultExport);
