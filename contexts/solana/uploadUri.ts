import { getPinataJWT } from "@/components/utils/getPinataJWT";

// export const solConnection = new Connection("https://api.devnet.solana.com");
// export const solConnection = new Connection("https://devnet.helius-rpc.com/?api-key=64dece04-37a4-4cc2-8fc7-bf7a66be06b1");
interface Content {
    "Air Handlers": number;
    BTU1: number;
    BTU2: number;
    BTU3: number;
    BTU4: number;
    SEER1: number;
    SEER2: number;
    SEER3: number;
    SEER4: number;
    Occupants: number;
    "No. Car Chargers": number;
    Softner: string;
    Envelope: number;
    "Water Heater Efficiency": number;
    "Water Heater": string;
    Tank: string;
    Pump: string;
    "Pool Heater": string;
    Spa: boolean;
    "No. Lights": number;
    "Light Type": string;
    Fridges: number;
    "No. TVs": number;
    "No. PCs": number;
    "No. Fans": number;
    "No. Washer": number;
    "No. Dryer": number;
    "No. Microwaves": number;
    "No. Ovens": number;
    "Self Produced": number;
    tuneup_date?: Date;
    service_date?: Date;
}

export const uploadJsonToPinata = async (jsonData: any) => {
    try {
        const JWT = await getPinataJWT();
        const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
            method: 'POST',
            headers: {
                // Replace YOUR_PINATA_JWT with your actual JWT token
                Authorization: `Bearer ${JWT}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pinataContent: jsonData
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Uploaded JSON hash:', data.IpfsHash);
        return data.IpfsHash;
    } catch (error) {
        console.error('Error uploading JSON to Pinata:', error);
        throw error;
    }
};

export const uploadURIUpdate = async (
    isTune: boolean,
    originObject: Content,
    uriImage: string
) => {

    const tempObject = originObject;
    if (isTune) {
        tempObject.tuneup_date = new Date();
    } else {
        tempObject.service_date = new Date();
    }

    try {
        const uri = await uploadJsonToPinata({
            name: 'Meta Tune Club',
            symbol: 'MTC',
            external_url: "https://www.3nergywhiz.com/",
            description: 'The first and only blockchain home service agreement.',
            image: uriImage,
            "properties": {
                "files": [
                    {
                        "uri": uriImage,
                        "type": "image/png"
                    }
                ],
                "category": "image"
            },
            attributes: originObject
        })
        const newURI = `https://gateway.pinata.cloud/ipfs/${uri}`;
        return newURI;
    } catch (error) {
        console.error(error, 'Found Error in Update URI');
        return false;
    }
}
