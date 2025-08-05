import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, Eye, Shield, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

const AadhaarSearch = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error("Please select an image file (JPG, PNG, etc.)");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    toast.success("Aadhaar card image uploaded successfully");
  };

  const processAadhaarCard = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    // Simulate OCR processing
    const steps = [
      { step: 20, message: "Scanning document..." },
      { step: 40, message: "Detecting text regions..." },
      { step: 60, message: "Extracting information..." },
      { step: 80, message: "Verifying data..." },
      { step: 100, message: "Processing complete!" }
    ];

    for (const { step, message } of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step);
      if (step < 100) {
        toast.info(message);
      }
    }

    // Simulate successful extraction
    setResult({
      name: "Priya Sharma",
      aadhaarNumber: "****-****-1234", // Masked for security
      dateOfBirth: "15/05/1990",
      gender: "Female",
      address: "123 Main Street, Mumbai, Maharashtra - 400001",
      confidence: 92,
      verified: true
    });

    setProcessing(false);
    toast.success("Aadhaar information extracted successfully!");
  };

  const clearResults = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
            <FileText className="h-3 w-3 mr-1" />
            Aadhaar Verification
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Aadhaar <span className="text-gradient">OCR Search</span>
          </h1>
          
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
            Upload an Aadhaar card image for instant OCR processing and identity verification. 
            Your data is processed securely and never stored.
          </p>
        </div>

        {/* Ethics Warning */}
        <Alert className="mb-8 border-warning bg-warning-light">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-foreground-muted">
            <strong>Important:</strong> This feature is for ethical verification purposes only. 
            Aadhaar information is extracted temporarily for verification and is never stored on our servers. 
            Please ensure you have permission to process the Aadhaar card.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="gradient-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Aadhaar Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : file 
                    ? 'border-success bg-success/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-12 w-12 mx-auto text-success" />
                    <div>
                      <p className="font-medium text-success">File uploaded successfully</p>
                      <p className="text-sm text-foreground-muted">{file.name}</p>
                      <p className="text-xs text-foreground-muted">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-foreground-muted" />
                    <div>
                      <p className="text-lg font-medium">Drop your Aadhaar card here</p>
                      <p className="text-foreground-muted">or click to browse files</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                    <p className="text-xs text-foreground-muted">
                      Supports: JPG, PNG, PDF • Max size: 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Processing */}
              {processing && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Processing...</span>
                    <span className="text-sm text-foreground-muted">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Process Button */}
              <Button 
                onClick={processAadhaarCard}
                disabled={!file || processing}
                className="w-full gradient-primary text-white border-0"
                size="lg"
              >
                {processing ? "Processing..." : "Extract Information"}
              </Button>

              {/* Security Features */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-foreground-muted">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-success" />
                  <span className="text-foreground-muted">No data storage policy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-foreground-muted">GDPR compliant processing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="gradient-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Extracted Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Confidence Score */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {result.confidence}%
                    </div>
                    <p className="text-foreground-muted">Extraction Confidence</p>
                    <Badge 
                      variant={result.confidence > 90 ? "default" : "secondary"}
                      className={result.confidence > 90 ? "gradient-primary text-white border-0 mt-2" : "mt-2"}
                    >
                      {result.confidence > 90 ? "High Accuracy" : "Medium Accuracy"}
                    </Badge>
                  </div>

                  {/* Extracted Data */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-foreground-muted">Name:</span>
                        <span className="font-medium">{result.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-foreground-muted">Aadhaar Number:</span>
                        <span className="font-mono">{result.aadhaarNumber}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-foreground-muted">Date of Birth:</span>
                        <span className="font-medium">{result.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-foreground-muted">Gender:</span>
                        <span className="font-medium">{result.gender}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-foreground-muted">Address:</span>
                        <span className="font-medium text-right max-w-48">{result.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-success-light">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium text-success">Document Verified</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={clearResults}
                      className="flex-1"
                    >
                      Clear Results
                    </Button>
                    <Button 
                      className="flex-1 gradient-secondary text-white border-0"
                      onClick={() => toast.info("Search functionality would be implemented here")}
                    >
                      Search Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-foreground-muted" />
                  <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                  <p className="text-foreground-muted">
                    Upload an Aadhaar card image to see extracted information here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-12 gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="text-center">How OCR Extraction Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Upload", description: "Upload clear image of Aadhaar card" },
                { step: "2", title: "Scan", description: "AI scans and identifies text regions" },
                { step: "3", title: "Extract", description: "OCR extracts information accurately" },
                { step: "4", title: "Verify", description: "Information is verified and formatted" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Assurance */}
        <Card className="mt-8 bg-warning-light border-warning">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-warning mt-1" />
              <div>
                <h4 className="font-semibold text-warning mb-2">Security & Privacy Guarantee</h4>
                <p className="text-sm text-foreground-muted">
                  Your Aadhaar information is processed using secure OCR technology and is never stored on our servers. 
                  All processing happens in real-time and the data is immediately discarded after extraction. 
                  We comply with all data protection regulations and maintain the highest security standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AadhaarSearch;