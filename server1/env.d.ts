declare global {
    namespace NodeJS {
        interface processEnv {
            ATLAS_URL: string
            PORT: number
            secretKey: string
        }
    }
}

export{}