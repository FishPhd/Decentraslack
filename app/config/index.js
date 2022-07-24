"use strict"

const { API_URL, HIDE_STATUS, WEBHOOK_URL } = process.env

const HEDERA_NETWORK = 'testnet'
const HEDERA_ACCOUNT_ID = `0.0.47732845`
const HEDERA_PRIVATE_KEY = `302e020100300506032b65700422042026e5a17d31dec692ddf4c7fbf25ae55751d265df592dea88317ab4b0f32305d6`

const API_SECRET_KEY=`thisisasecrethederakey`
const ENCRYPTION_KEY=`Qx7zPpYoifHHOPSrYMXUhe0Lt/Md9v1/`

const AUTH_KEY_MIN_LENGTH = 10
const authenticationKeyValid = () =>
	API_SECRET_KEY && API_SECRET_KEY.length >= AUTH_KEY_MIN_LENGTH

export default {
	authenticationKeyValid,
	network: HEDERA_NETWORK.toLowerCase(),
	accountId: HEDERA_ACCOUNT_ID,
	privateKey: HEDERA_PRIVATE_KEY,
	authenticationKey: API_SECRET_KEY,
	encryptionKey: ENCRYPTION_KEY,
	apiUrl: API_URL,
	hideStatus: HIDE_STATUS,
	webhookUrl: WEBHOOK_URL
}
