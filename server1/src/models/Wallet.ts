import {Schema, Types, model} from 'mongoose';

export interface IWallet {
    user: Types.ObjectId;
    total?: number;
    stocks?: [];
}

const WalletSchema = new Schema<IWallet>({
    user: {type: Schema.Types.ObjectId, required:true},
    total: {type: Number, required: true, default: 10000},
    stocks: []
})

const Wallet = model<IWallet>('Wallet', WalletSchema);

export default Wallet;