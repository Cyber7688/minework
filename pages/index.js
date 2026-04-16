import { useEffect, useMemo, useState } from 'react'

const MINE_WALLETS = [
  { name: 'vastminer1', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x2465438E1Bd53B2d4981FC7e0b167D3e66201954' },
  { name: 'vastminer2', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xc0E7a9ED7ea8D73f1970E94f58Aa2F980F4C0A80' },
  { name: 'vastminer3', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x39E74aD2a4C59852dE8666CAF22c5172f8eFE64f' },
  { name: 'vastminer4', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8C054Cf0D130A1A4F91f8869044Fe1Fe76eBf42F' },
  { name: 'vastminer5', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x4b0B17Bef22165e8FFC153D30cd1789893cB0C05' },
  { name: 'vastminer6', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x7bCd23F9e8e161502e7aE4C717C78D9e1fBaab26' },
  { name: 'vastminer7', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x826D266B36F65d366c56DbD88fE6E5bd270444cD' },
  { name: 'vastminer8', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x1f4351002e5E4CC1315D9F913079525b3C2b7Baa' },
  { name: 'vastminer9', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xE531e2B596ad2C74d787a9E9fb6d75C9D92E522B' },
  { name: 'vastminer10', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xb1f2E0a55327Cbe96a4CAB9561444D87E7efb119' },
  { name: 'vastminer11', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x3724B26A17366Ef8B30530b8177C0C94ba46E9D5' },
  { name: 'vastminer12', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x1a755DE13e95f2B7d45BE11733a5eEACe7C1bD66' },
  { name: 'vastminer13', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x26738af89D5f3c8570C95ed5707533a5F4872EfB' },
  { name: 'vastminer14', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xE92ea2463A5aEcaCE5090a26981E5faC334B0760' },
  { name: 'vastminer15', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xe61b42C01A65892EaBFC6D2611bb5D71FFA02cBA' },
  { name: 'vastminer16', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xab761eC6530bF357c2256E10a72320527d020322' },
  { name: 'vastminer17', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xa27eCE942484b58628Cc8Be290539B9dEEa4eaB0' },
  { name: 'vastminer18', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x01F80385493d43Ab89138ed7D784bC2C0b3BBC94' },
  { name: 'vastminer19', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xbc4a3d71e797b508cb7617b5109f08C10c04be86' },
  { name: 'vastminer20', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x5CAb0592BF2b1C5fA04E3e98b39eC90541A0A890' },
  { name: 'vastminer21', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x314De7e6DeB7F7672130cebc1d052Dff179A2e46' },
  { name: 'vastminer22', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xaD5b8B8A6DDa5Ceb84b3775bFCfdFeDcbf9Cb1A3' },
  { name: 'vastminer23', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xC2ce2F535963135FbA8eac2E7003124eEaaB021C' },
  { name: 'vastminer24', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x65b3Ff3Ecf1e5CD8458D083C3fd9Cd0998eC8011' },
  { name: 'vastminer25', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8e5F2baeD28B7C70a795a4267d1B04e71710adD0' },
  { name: 'vastminer26', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x89AeB88D67EDE060694B830f7863B936380E9a58' },
  { name: 'vastminer27', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xFe94526B9FdC88eDDd61350D0Ec2223e22C8e07d' },
  { name: 'vastminer28', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x97746913B503B91F4F6F2Bd595bd64E91a38F5b2' },
  { name: 'vastminer29', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xEA794210A250c4AEA9c6fdA69A6A776FEF24A33a' },
  { name: 'vastminer30', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x650c5cf51f7433ac33e6bb110B9354199C6561bD' },
  { name: 'vastminer31', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x92eb985aa2aE3272C4b02145dc12bb79a052fa87' },
  { name: 'vastminer32', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x399D1591F9fb0c2FeE9121CCC5504031A3E56bC2' },
  { name: 'vastminer33', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8DA717205045bDB3cE35980B2d9867a76842bb64' },
  { name: 'vastminer34', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xEe29727C755660945E7AA0fdfbc8D63F9A2f9bf3' },
  { name: 'vastminer35', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8ffc59D55a7C150F8740d42c60BC7e23efF70E72' },
  { name: 'vastminer36', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xA5e2B0C5bFd88C77fc4AF6Ed8639545ce4bB5699' },
  { name: 'vastminer37', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x095e22B94DB83Ec6b61058d72444D57ec6392d43' },
  { name: 'vastminer38', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x800586101cfBFE5360632f9f6809c210417c5E85' },
  { name: 'vastminer39', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xfE44c10085D022f25AD1B02C31EC1bD393E6B3eC' },
  { name: 'vastminer40', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xcED31150618405a4c234133Cd76BeA0a5282Bd9b' },
  { name: 'vastminer41', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x5d3BC2df96E009Ec240114d8819667AaA803d3aF' },
  { name: 'vastminer42', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xbef2ed621afC3a1406538A8885fc29843bFcA3f1' },
  { name: 'vastminer43', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x35A989ED059bE4D6a639e2678Cc47BF8119c1d45' },
  { name: 'vastminer44', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x89A21880eAF35aDD7Ac16E886041F06671F9fcc5' },
  { name: 'vastminer45', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x1dc44e5C83D04d0E0C90baB775Efd2B189316B17' },
  { name: 'vastminer46', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xabf898572b60658C9C52C790F5fF5630d681107c' },
  { name: 'vastminer47', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x42cE85AdDAdc55B89aA85ac7589E6bB2FCa4eA42' },
  { name: 'vastminer48', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x76610F6f633E7D3363b04f8AFdA6813818AF3CEE' },
  { name: 'vastminer49', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xd4667E421FDe31cd1acF9B9b40AefCF84Cd94eAb' },
  { name: 'vastminer50', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8B2449b8FC7B26232e7C2CF12E8E79F7B56726ce' },
  { name: 'vastminer51', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x3Bb64A1fa2Df0f7bC120101cAD1d0ea01a4e1219' },
  { name: 'vastminer52', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x713d74b7A99B7492bF631dE722c443518Ac233F5' },
  { name: 'vastminer53', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x0DBe716E73Ed5D69e75B4A40D41Cebe17F08Ef3f' },
  { name: 'vastminer54', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x6c5348a660caa5A65F4cfb50f814e96cBF174D68' },
  { name: 'vastminer55', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x5D2D058223CA754399E9bc7d878b12a7d574f3A1' },
  { name: 'vastminer56', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x6b39b2d2E52DfC7560718bEb6A3e19406A0dCb3b' },
  { name: 'vastminer57', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x4b41437Dc8BEb5e13c0C5B12995238955588074d' },
  { name: 'vastminer58', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x950B25Bc97839914c0d14e135965711E2A0f831F' },
  { name: 'vastminer59', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xE3F47108602370c450d30708e4E721d71bBf1Fd4' },
  { name: 'vastminer60', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x5292CE1e30F9de88a7035cD0475FdA563E0eb954' },
  { name: 'vastminer61', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x0e3BAfd1b90831Bf12c149038D636918972feFc9' },
  { name: 'vastminer62', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x799e98cFe1485567F6427401239B17c906eA6167' },
  { name: 'vastminer63', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x7271F2A33461db8f663bF896C3cBEda41d8B9F99' },
  { name: 'vastminer64', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xCdFFED346E21F4Bb6296e3bE812d76fD94cc39F6' },
  { name: 'vastminer65', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xe1b8604CfEb88464B79c0EB2d9D2A5210720F1C4' },
  { name: 'vastminer66', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x3371976ed5864d53735A2d7A1Cc9aB097b2f3e32' },
  { name: 'vastminer67', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x543B85F2C2f86259852455E98946e741c3529ed8' },
  { name: 'vastminer68', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x291CfA6042Bf60fd3BC111f660FA7b4fB02Acd45' },
  { name: 'vastminer69', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x28f307245A8C7c50b783F2D4246F28825AcD92C9' },
  { name: 'vastminer70', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x0F59711230334D8A45A4a8A2E72767A6E72AAb60' },
  { name: 'vastminer71', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x1C6F2475dcF45d3DFaED40ca8064b438f97baEB2' },
  { name: 'vastminer72', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8FCa2BA380d5693E0E0bD81Ab986D4cDeFFb5B6f' },
  { name: 'vastminer73', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x877F72146cCC02e2233e43ce8EF666d19Ca0b19b' },
  { name: 'vastminer74', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x1E77Fe2AA718c44639854474f3c968045c7Cb5E4' },
  { name: 'vastminer75', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xd71b4B7Ec9b3cd7400f91F93ec301D7dA401FB75' },
  { name: 'vastminer76', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xbc7AA5BF36190838c76F4BBbB78f00E3E8730603' },
  { name: 'vastminer77', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xce54D7955F0752d4756F358C194dF0b946E260ef' },
  { name: 'vastminer78', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x17c625da7AA4312C2184a6cB9d0351AFD20Ff86A' },
  { name: 'vastminer79', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x95629f861E53E0F5b35BE03b06e1850E0b946350' },
  { name: 'vastminer80', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xc85E4B6Ced6A272b1C68AA8Df80f5Fba682a1864' },
  { name: 'vastminer81', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x4Ec2707826a912702aC822345323d6ED0Fb73DC3' },
  { name: 'vastminer82', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x6a64EE040BB0131b122cb4dEDA6aBf2310Be8485' },
  { name: 'vastminer83', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x8D6a9Ef56E9BB2185030Eb62a3821acb5Ac9bB56' },
  { name: 'vastminer84', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xAC2932767cfA163700738413Ce59bc5D44AaF172' },
  { name: 'vastminer85', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x5516AB293B5550310FD519EcCd55c7F794Ab28FE' },
  { name: 'vastminer86', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x4B65448643c28F3b192cc142E3483f6dF510028f' },
  { name: 'vastminer87', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xC50fad8ca881d649258762f3E6BB02dE812B7570' },
  { name: 'vastminer88', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x4d350eAdcc4bc68f339f3FE34B707fA902e16B93' },
  { name: 'vastminer89', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x2aF857bA20B2DC8b2cAbD8B3B427E566662c48d7' },
  { name: 'vastminer90', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xDDc6fe0A2c0818Cf99a53b284979788096E4C832' },
  { name: 'vastminer91', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xBe2cfAC7D06CEde5fb8C2118b05b433DCD322f87' },
  { name: 'vastminer92', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x3C0f784CAfcf083Ac68Bf2bE634f4E04BBb84bCc' },
  { name: 'vastminer93', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xAb86ddc9e598fE63da3d790e409D0474c3959E6F' },
  { name: 'vastminer94', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x17EBe509843fa478D94A96F8437abFD41F902a9A' },
  { name: 'vastminer95', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xe6C3260E32d090e11aB5679a26901880089Fe583' },
  { name: 'vastminer96', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xa24C466537A5FB18CadE8501082C967Ec4123A48' },
  { name: 'vastminer97', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xB3b1DF7b1399c508601c19901D1E63418FAfa40b' },
  { name: 'vastminer98', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x3709E5B4771aa2cFAF69AB8a17983Ef40ECC3aeB' },
  { name: 'vastminer99', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0x60e4D09297837D35a73D2Ba53AB5EE863519199B' },
  { name: 'vastminer100', role: 'miner', host: 'VAST', datasets: ['ds_wikipedia'], address: '0xc0535BdD9B291135f8cAD9560f08B74D34DF6fAD' },
]

const PREDICT_WALLETS = [
  { name: 'bot001', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xfB3dc91c03FB16Dfd2797B08945091cc8d05Ebe1' },
  { name: 'bot002', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x3318E7f6Bb78664e4b7BD00bc803DBf762a09F4A' },
  { name: 'bot003', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x4138664565899BE47838A1148e5539A6EC4E331E' },
  { name: 'bot004', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xdE6CaA6Aa886Cd09132E8aac09f48D675bC95fD9' },
  { name: 'bot005', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x620890Be1724468f95a554ced0F5b82Dbe6d39a9' },
  { name: 'bot006', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x13e21FAd5AA7734243069e0537d8a83682a2E52C' },
  { name: 'bot007', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x18ae05Ba286C2EBD4805A13B96323c20034E4Bd9' },
  { name: 'bot008', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xB881634710d11A1F7F10b52a39261BB9b466c780' },
  { name: 'bot009', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xb7d2a7F4d66f1B85B9A5710042B6c205C3E8f558' },
  { name: 'bot010', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x583244FC31ae77711BcA893943a0296523F7D4d9' },
  { name: 'bot011', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0xa933dbC81e5075Ab352D75932Cfd0Bda21370ebf' },
  { name: 'bot012', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x110932BB307Ee2B4d1ec6d1F46815a4296B075Ff' },
  { name: 'bot013', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0xF1fe2e890b6397d3e98902fED8808f8F25C76911' },
  { name: 'bot014', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xc9E9CD71b17B2f1576ee3913ED1d51363F8c8687' },
  { name: 'bot015', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x064d790723A0C256462b081d2d98F5Ec3Be2c47b' },
  { name: 'bot016', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x0023FDE0F8B8eadb639146b6BFDc2cA613419f52' },
  { name: 'bot017', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xF466AF6c5B77B9aa9a6D705fc306AAA23f55572F' },
  { name: 'bot018', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x9dcE3A88a46D5FbdF176041b69f0fDd42123906C' },
  { name: 'bot019', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xC3569dC323922BE76129c9E929a6b46108D60FEB' },
  { name: 'bot020', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x677ED7627A7914Fea876573b1BeC0c8874DDe329' },
  { name: 'bot021', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x37B0cfDafbeb91d1d04e5698Cc102D5bba898c53' },
  { name: 'bot022', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xfe4caD6201119883E003a9186e0c5B8f4a8b4AD4' },
  { name: 'bot023', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0x7C394F3e90d76c3A5B5926892beDA8BdD477311e' },
  { name: 'bot024', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xd879D4B4B6ce3fe8B3e470852c51e4B18d190d24' },
  { name: 'bot025', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xA1414D0D4654A6939FC00251B2b5D1E4afd5642B' },
  { name: 'bot026', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x7124E8C6F45a6b6B12838c5176eE7bc29aaB7773' },
  { name: 'bot027', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0xF5b71C48a7Dc803FDdA80321070403fa841D49b4' },
  { name: 'bot028', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0x9910be6Fb51C95da581fFd9fF9a0fFd0A713Daee' },
  { name: 'bot029', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x7C3Fd62fA0dA19384Fca70c9c693B98b55B6B626' },
  { name: 'bot030', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x92bc7DbFE5Cc5aa11f4d6bF21559DbCAd0A2774E' },
  { name: 'bot031', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0xA8F9C04d1890F82CA77C11d5Ef73A1d667904c1D' },
  { name: 'bot032', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xE1E3Ba4069e27E01d9f185712632BA2a4bffEdfD' },
  { name: 'bot033', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x6591b8a9b358F21E8584f17F08723d03D590830A' },
  { name: 'bot034', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x7762E392F5C242BeBb784e4aB5E3eFf213C2fC6D' },
  { name: 'bot035', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x2A75DBDf5C6a8AB5421D373F6e845140d1d574F2' },
  { name: 'bot036', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x99Ddc65799eAe37Ff8419f76a2770348a584916b' },
  { name: 'bot037', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x921bdc7180D1F0EfbAE3d42F809B262010C39Db2' },
  { name: 'bot038', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xd631F9515A5781047131A84dA2a1e82A77E70a7f' },
  { name: 'bot039', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0xe7a3cF0123E11B46FBe78d65CD8F2B009563Edd6' },
  { name: 'bot040', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xf227F59dA19Cdd2774745B459Cd1F7902AcC47E3' },
  { name: 'bot041', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xB9812D850e6D59b0bE7b8d5Ae806F1946FbafC6f' },
  { name: 'bot042', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0xD3C3Bc271de9341d487E4695AaC16Af9f4157623' },
  { name: 'bot043', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xf7bc198b595edb5dc92A8db183e921f3c2B2729f' },
  { name: 'bot044', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x0619BA8b092869fbE514AD5669DB6c344155A57C' },
  { name: 'bot045', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xf21157092A408AC09cFD02219414D830A596bF8A' },
  { name: 'bot046', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x4a7bCf7529202ad14cc4BC7D98ec218Bd34C7970' },
  { name: 'bot047', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x1E12Dae6e0ae45E0CD4EeE7d36d62ae32B52824f' },
  { name: 'bot048', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x68AB39C5DE8e3DAb64A8DA993a6F45e66B1A87D0' },
  { name: 'bot049', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x43E1329f781D19593b3965e001CEE6411c07f4ac' },
  { name: 'bot050', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xDb50f5cB9FaB1a6ae6E642A60EC376bd7235Fe12' },
  { name: 'bot051', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x897Fc33F15901e2BA7ac14209c7fc4bf3Dd99362' },
  { name: 'bot052', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x6a61e125030227106CB8DcB8CD58411c9E28e198' },
  { name: 'bot053', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x1cD3507eafe375B8E62FC153D8B1BF8947ed4d9a' },
  { name: 'bot054', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0xDD2767842C2754eE0fBE2314D669D1403e66d027' },
  { name: 'bot055', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x636B18026a5004dD729046D6EE82F964e2E510f6' },
  { name: 'bot056', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xaB92Dd13140E92406F0b68f8df776Ee3C596fF4D' },
  { name: 'bot057', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0x4810AaACe034B8dA292cEe39D14ECc0378b1Ce84' },
  { name: 'bot058', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x82a9d3Dd6CfB79B4683C62d0F2B0e47B826b3028' },
  { name: 'bot059', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xEC4BD18c7DE393bf2A964f3AE56Be9b4F69cC9Cf' },
  { name: 'bot060', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x422a471bDa8bbcA2a61B94c974c5a1000CCe0017' },
  { name: 'bot061', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x6C2349A2a0778aE139B1a56b66f4dDf0109c7d1b' },
  { name: 'bot062', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x2076Fb9a0002aeFA9D7578fFEe9f542c13219A00' },
  { name: 'bot063', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x8B474220608c78aC5C653519CEdc0a245B9D38e9' },
  { name: 'bot064', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0x89F573ca4b1e0705394eb7685f359Fd0178b9d03' },
  { name: 'bot065', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0xaA89B97F8A71c78b709c5A221Dcc22957c97F692' },
  { name: 'bot066', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x2fc61ce37474e7A47e2E385B5B5a8C593135AE05' },
  { name: 'bot067', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0xFf9Eb1e1AC65ae10Bb7699D734cbBC1718741c7A' },
  { name: 'bot068', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xA94830adF94024d0FfD6E685de3Ad38691c13983' },
  { name: 'bot069', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x8445982CFaA781e68475BaE459cbAaBf54655E2D' },
  { name: 'bot070', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x9C2Ed7b40ed94A46065719e9EBBF7aC335C12B1f' },
  { name: 'bot071', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xa5F6AeAB703C08c7EB6c267C8F5F1C3A874DF393' },
  { name: 'bot072', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xe3F554B91c1568A0B5dbc708Cb2FFDcbe4C2b411' },
  { name: 'bot073', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x68c3aA28fdA4E9F891572CAF68cbCBDe716e7093' },
  { name: 'bot074', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0xd8aE2109197bb39a1642697A0C11D08Ade1dD78A' },
  { name: 'bot075', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x25D2703705c5c71B75Ed81D60D9E0794E4e0Fa36' },
  { name: 'bot076', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xBCf3550cF00c747ba406319e63594a393fd18496' },
  { name: 'bot077', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0x7455212E73AdA844622c0F31c7A9dF446b574dAF' },
  { name: 'bot078', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xBE33AfD47932d3523a5D590F84B5eE73f783a263' },
  { name: 'bot079', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x73F7C245a812f99294bD9864f9e47A6cA2b3DE33' },
  { name: 'bot080', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0xd27a403F4eFbb87EAed2D35611822aCCf2727b2A' },
  { name: 'bot081', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x311Fb17b42d9930A392e258e7A75452Be655F50f' },
  { name: 'bot082', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x1f88f09657cAAb7ae959f02cCF7257C6b64e4998' },
  { name: 'bot083', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x129184A2FD4761944912a4B202EcEec7A459B4f0' },
  { name: 'bot084', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0x252B7172BFb590c1b503F4E5514dCBDc3c87724f' },
  { name: 'bot085', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x4EE617c170044B40dAe59aCd6DcE200e6537542F' },
  { name: 'bot086', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x9e425E4940Aa64ce8811277bD63da8726Ff1D061' },
  { name: 'bot087', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0x2A7eDf7F06D7F8e837D9D0a5280006dcC1E46C56' },
  { name: 'bot088', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x1F80B289b3Eb7D914e65af84D9FFAD487d6996F7' },
  { name: 'bot089', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x11704d4EEB5e22B8a1CC7E986E60A306359099a1' },
  { name: 'bot090', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x922b83fDDfFf529095b4F8dd0214FE79f7DD1064' },
  { name: 'bot091', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0x00034BC0D027fFE385044db8101af51d7217Ea76' },
  { name: 'bot092', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x29678DD75c14F3C445f7E83638A7b71DAe300349' },
  { name: 'bot093', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x268ed8A19a10505E9f62CA953F18e8aBd6b8bF0e' },
  { name: 'bot094', role: 'predict', host: 'VAST', datasets: ['persona: quant_trader', 'fleet: 100-bots'], address: '0xE968cf83e2e84E0B7289243372185cD67fCFd7A8' },
  { name: 'bot095', role: 'predict', host: 'VAST', datasets: ['persona: contrarian', 'fleet: 100-bots'], address: '0x9C3f0AddE1171294c7A245c9e59772bd66Bd0f36' },
  { name: 'bot096', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x2aA195BF5aAa2D088B0aFdC387e18Adf7Cc81A16' },
  { name: 'bot097', role: 'predict', host: 'VAST', datasets: ['persona: macro_analyst', 'fleet: 100-bots'], address: '0xEeD897deb8DcE0f420017fFE131deb3A3E6f9440' },
  { name: 'bot098', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x6a4767666EbEDbCA735D3BBb10713F8629f69ee1' },
  { name: 'bot099', role: 'predict', host: 'VAST', datasets: ['persona: chartist', 'fleet: 100-bots'], address: '0xcE3F07B656F28706822c8325D4c5b2109e7e3b56' },
  { name: 'bot100', role: 'predict', host: 'VAST', datasets: ['persona: degen', 'fleet: 100-bots'], address: '0x6f819AFbB08298D0c3F1c7F1812BBec2351e8896' },
]

const COLORS = {
  bg: '#03060d',
  bg2: '#090d18',
  panel: 'rgba(10, 18, 32, 0.82)',
  panelStrong: 'rgba(12, 22, 40, 0.94)',
  border: 'rgba(94, 234, 212, 0.18)',
  text: '#e6f7ff',
  subtext: '#87a3c3',
  cyan: '#67e8f9',
  green: '#4ade80',
  yellow: '#facc15',
  red: '#fb7185',
  blue: '#60a5fa',
  purple: '#a78bfa',
}

function fmt(n, digits = 2) {
  if (n == null || Number.isNaN(Number(n))) return '-'
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits })
}

function sortMineWallets(wallets) {
  const hostRank = { '1387': 1, '1691': 2, '34351': 3, 'local': 4 }
  const roleRank = { validator: 1, miner: 2 }
  const minerOrder = (name) => {
    if (name === 'miner1387') return 1
    const m1387x = /^miner1387x(\d+)$/.exec(name)
    if (m1387x) return 100 + Number(m1387x[1])
    const m = /^miner(\d+)$/.exec(name)
    if (m) return 200 + Number(m[1])
    if (name === 'miner-local-extra') return 9999
    return 5000
  }
  return [...wallets].sort((a, b) => {
    const hostDiff = (hostRank[a.host] || 99) - (hostRank[b.host] || 99)
    if (hostDiff !== 0) return hostDiff
    const roleDiff = (roleRank[a.role] || 99) - (roleRank[b.role] || 99)
    if (roleDiff !== 0) return roleDiff
    if (a.role === 'miner' && b.role === 'miner') {
      return minerOrder(a.name) - minerOrder(b.name)
    }
    return a.name.localeCompare(b.name)
  })
}

function extractSummary(profile, history, wallet, extras = {}) {
  if (wallet.role === 'predict') {
    const stats = profile?.stats || {}
    const today = profile?.today || {}
    const epoch = extras?.epoch || {}
    const equity = extras?.equity || {}

    return {
      online: Number(today.balance ?? 0) > 0,
      credit: Number(today.balance ?? 0),
      taskCount: Number(today.submissions ?? stats.total_submissions ?? 0),
      avgScore: Number(today.accuracy ?? stats.accuracy ?? 0),
      totalRewards: Number(today.estimated_reward ?? stats.total_earned ?? 0),
      qualifiedEpochs: Number(today.correct ?? stats.correct ?? 0),
      resolved: Number(today.resolved ?? stats.total_resolved ?? 0),
      excess: Number(today.excess ?? stats.net_chips ?? 0),
      rank: Number(stats.rank ?? 0),
      pnl: Number(equity.final_pnl ?? 0),
      currentEpochPredictions: Number(epoch.predictions_today ?? 0),
      marketsResolved: Number(epoch.markets_resolved ?? 0),
    }
  }

  const miner = profile?.miner || {}
  const validator = profile?.validator || {}
  const currentEpochMiner = profile?.current_epoch?.miner || {}
  const currentEpochValidator = profile?.current_epoch?.validator || {}
  const minerSummary = profile?.miner_summary || {}
  const validatorSummary = profile?.validator_summary || {}
  const totalRewards = wallet.role === 'validator'
    ? (validatorSummary?.total_rewards ?? 0)
    : (minerSummary?.total_rewards ?? history.reduce((sum, item) => sum + (Number(item.reward_amount) || 0), 0))
  const qualifiedEpochs = history.filter((x) => x.qualified).length

  const validatorEpochTasks = Number(currentEpochValidator.eval_count ?? 0)
  const validatorLifetimeEvals = Number(validatorSummary.total_evals ?? 0)
  const minerEpochTasks = Number(currentEpochMiner.task_count ?? 0)
  const minerLifetimeTasks = Number(minerSummary.total_tasks ?? 0)

  return {
    online: wallet.role === 'validator' ? Boolean(validator.online) : Boolean(miner.online),
    credit: wallet.role === 'validator' ? (validator.credit ?? 0) : (miner.credit ?? 0),
    taskCount: wallet.role === 'validator' ? validatorEpochTasks : minerEpochTasks,
    lifetimeTaskCount: wallet.role === 'validator' ? validatorLifetimeEvals : minerLifetimeTasks,
    avgScore: wallet.role === 'validator'
      ? Number(currentEpochValidator.accuracy ?? validatorSummary.avg_accuracy ?? 0)
      : Number(currentEpochMiner.avg_score ?? minerSummary.avg_score ?? 0),
    totalRewards,
    qualifiedEpochs,
  }
}

function getStatus(summary) {
  if (!summary) return { label: 'UNKNOWN', color: COLORS.yellow }
  if (summary.online) return { label: 'RUNNING', color: COLORS.green }
  return { label: 'STOPPED', color: COLORS.red }
}

export default function Home() {
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [hostFilter, setHostFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [copied, setCopied] = useState('')
  const [viewMode, setViewMode] = useState('mine')
  const [autoRefresh, setAutoRefresh] = useState(true)

  const activeWallets = viewMode === 'predict' ? PREDICT_WALLETS : sortMineWallets(MINE_WALLETS)

  const rows = useMemo(() => {
    return activeWallets.map((wallet) => {
      const row = profiles[wallet.address]
      return {
        wallet,
        profile: row?.profile || null,
        history: row?.history || [],
        summary: row?.summary || null,
      }
    })
  }, [profiles, activeWallets])

  const filteredRows = useMemo(() => {
    return rows.filter(({ wallet }) => {
      const hostOk = hostFilter === 'all' || wallet.host === hostFilter
      const roleOk = roleFilter === 'all' || wallet.role === roleFilter
      return hostOk && roleOk
    })
  }, [rows, hostFilter, roleFilter])

  const hostOptions = useMemo(() => ['all', ...Array.from(new Set(activeWallets.map((wallet) => wallet.host)))], [activeWallets])
  const roleOptions = useMemo(() => ['all', ...Array.from(new Set(activeWallets.map((wallet) => wallet.role)))], [activeWallets])

  const totals = useMemo(() => {
    const summaries = filteredRows.map((x) => x.summary).filter(Boolean)
    return {
      running: summaries.filter((x) => x.online).length,
      stopped: filteredRows.length - summaries.filter((x) => x.online).length,
      tasks: summaries.reduce((sum, x) => sum + (Number(x.taskCount) || 0), 0),
      rewards: summaries.reduce((sum, x) => sum + (Number(x.totalRewards) || 0), 0),
      avgScore: summaries.length ? summaries.reduce((sum, x) => sum + (Number(x.avgScore) || 0), 0) / summaries.length : 0,
      qualifiedEpochs: summaries.reduce((sum, x) => sum + (Number(x.qualifiedEpochs) || 0), 0),
    }
  }, [filteredRows])

  async function loadAll() {
    setLoading(true)
    const entries = await Promise.all(activeWallets.map(async (wallet) => {
      try {
        const endpoint = wallet.role === 'predict' ? 'predict-profile' : 'mine-profile'
        const res = await fetch(`/api/${endpoint}?address=${wallet.address}`)
        const json = await res.json()
        const profile = json.profile || null
        const history = json.history || []
        const extras = {
          equity: json.equity || null,
          epoch: json.epoch || null,
        }
        return [wallet.address, {
          wallet,
          profile,
          history,
          summary: extractSummary(profile, history, wallet, extras),
        }]
      } catch (e) {
        return [wallet.address, {
          wallet,
          profile: null,
          history: [],
          summary: null,
          error: String(e),
        }]
      }
    }))
    const next = Object.fromEntries(entries)
    setProfiles(next)
    setLastUpdated(new Date())
    setLoading(false)
  }

  async function copyAddress(addr) {
    try {
      await navigator.clipboard.writeText(addr)
      setCopied(addr)
      setTimeout(() => setCopied(''), 1500)
    } catch {}
  }

  useEffect(() => {
    loadAll()
  }, [viewMode])

  useEffect(() => {
    if (!autoRefresh) return undefined
    const id = setInterval(() => {
      loadAll()
    }, 60000)
    return () => clearInterval(id)
  }, [autoRefresh, viewMode])

  function switchView(nextView) {
    setViewMode(nextView)
    setProfiles({})
    setHostFilter('all')
    setRoleFilter('all')
    setLastUpdated(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(circle at top left, rgba(103,232,249,0.10), transparent 25%), radial-gradient(circle at top right, rgba(167,139,250,0.12), transparent 22%), linear-gradient(180deg, ${COLORS.bg2} 0%, ${COLORS.bg} 100%)`, color: COLORS.text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
      <div style={{ maxWidth: 1650, margin: '0 auto', padding: '30px 16px 50px' }}>
        <style>{`
          @media (max-width: 900px) {
            .metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .panels-grid { grid-template-columns: 1fr !important; }
            .desktop-table { display: none !important; }
            .mobile-cards { display: block !important; }
            .top-controls { flex-direction: column !important; align-items: stretch !important; }
          }
          @media (min-width: 901px) {
            .mobile-cards { display: none !important; }
          }
        `}</style>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
          <div>
            <div style={{ color: COLORS.green, fontSize: 13, letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>
              &gt;_ {viewMode === 'predict' ? 'predict worknet' : 'minework'} // cyber ops console
            </div>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.05, textShadow: '0 0 20px rgba(103,232,249,0.18)' }}>
              {viewMode === 'predict' ? 'Predict Fleet Dashboard' : 'Fleet Monitoring Dashboard'}
            </h1>
            <p style={{ color: COLORS.subtext, marginTop: 12, marginBottom: 0, maxWidth: 860, lineHeight: 1.6 }}>
              {viewMode === 'predict'
                ? 'Separate view for Predict wallets with persona labels, wallet visibility, and quick ops refresh.'
                : 'Full wallet visibility, filters, copyable addresses, and a mobile-friendly ops view.'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={loadAll} disabled={loading} style={{ background: loading ? '#12304a' : '#0f766e', color: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '12px 18px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 24px rgba(20,184,166,0.18)' }}>
              {loading ? 'SYNCING...' : 'REFRESH ALL'}
            </button>
            <div style={{ color: COLORS.subtext, fontSize: 12 }}>
              {lastUpdated ? `last sync :: ${lastUpdated.toLocaleString()}` : 'last sync :: never'}
            </div>
          </div>
        </div>

        <div className="top-controls" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <ViewToggle value={viewMode} onChange={switchView} />
          <AutoRefreshToggle value={autoRefresh} onChange={setAutoRefresh} />
          <FilterBox label="HOST" value={hostFilter} onChange={setHostFilter} options={hostOptions} />
          <FilterBox label="ROLE" value={roleFilter} onChange={setRoleFilter} options={roleOptions} />
        </div>

        <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12, marginBottom: 24 }}>
          <MetricCard label="RUNNING" value={fmt(totals.running, 0)} color={COLORS.green} />
          <MetricCard label="STOPPED" value={fmt(totals.stopped, 0)} color={COLORS.yellow} />
          <MetricCard label={viewMode === 'predict' ? 'SUBMISSIONS' : 'EPOCH TASKS'} value={fmt(totals.tasks, 0)} color={COLORS.cyan} />
          <MetricCard label={viewMode === 'predict' ? 'CORRECT' : 'QUALIFIED'} value={fmt(totals.qualifiedEpochs, 0)} color={COLORS.purple} />
          <MetricCard label={viewMode === 'predict' ? 'EST. REWARD' : 'REWARDS'} value={fmt(totals.rewards)} color={COLORS.green} />
          <MetricCard label={viewMode === 'predict' ? 'ACCURACY' : 'AVG SCORE'} value={fmt(totals.avgScore)} color={COLORS.cyan} />
        </div>

        <div className="panels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 24 }}>
          <Panel title="HOST MAP">
            {hostOptions.filter((host) => host !== 'all').map((host) => (
              <HostLine key={host} host={host} count={rows.filter((r) => r.wallet.host === host).length} />
            ))}
          </Panel>
          <Panel title="ROLE SPLIT">
            {roleOptions.filter((role) => role !== 'all').map((role) => (
              <HostLine key={role} host={role} count={rows.filter((r) => r.wallet.role === role).length} />
            ))}
          </Panel>
          <Panel title="OPS NOTES">
            <div style={{ color: COLORS.subtext, fontSize: 13, lineHeight: 1.7 }}>
              - Tap/click COPY to grab a full wallet address.<br />
              - Mobile switches to stacked cards automatically.<br />
              - {viewMode === 'predict' ? 'Persona hints below are static ops labels for predict wallets.' : 'Dataset hints below are static ops labels, not secrets.'}
            </div>
          </Panel>
        </div>

        <div className="desktop-table" style={{ overflowX: 'auto', background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 18, boxShadow: '0 10px 50px rgba(0,0,0,0.35), inset 0 0 40px rgba(96,165,250,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: COLORS.panelStrong }}>
                {(viewMode === 'predict'
                  ? ['NAME', 'ROLE', 'HOST', 'WALLET', 'STATUS', 'PERSONA', 'BALANCE', 'SUBMITS', 'ACCURACY', 'EST. REWARD']
                  : ['NAME', 'ROLE', 'HOST', 'WALLET', 'STATUS', 'DATASETS', 'CREDIT', 'EPOCH TASKS', 'LIFETIME TASKS', 'AVG SCORE', 'TOTAL REWARDS']
                ).map((h) => (
                  <th key={h} style={{ padding: '14px 12px', textAlign: 'left', fontSize: 12, color: COLORS.subtext, letterSpacing: 1.2, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(({ wallet, summary }) => {
                const status = getStatus(summary)
                return (
                  <tr key={wallet.address} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: 12, fontWeight: 700 }}>{wallet.name}</td>
                    <td style={{ padding: 12 }}><Badge color={wallet.role === 'validator' ? COLORS.yellow : wallet.role === 'predict' ? COLORS.purple : COLORS.blue} text={wallet.role.toUpperCase()} /></td>
                    <td style={{ padding: 12, color: COLORS.subtext }}>{wallet.host}</td>
                    <td style={{ padding: 12, maxWidth: 360 }}>
                      <div style={{ color: COLORS.cyan, fontSize: 12, wordBreak: 'break-all', marginBottom: 8 }}>{wallet.address}</div>
                      <button onClick={() => copyAddress(wallet.address)} style={{ background: 'transparent', color: copied === wallet.address ? COLORS.green : COLORS.subtext, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, cursor: 'pointer' }}>
                        {copied === wallet.address ? 'COPIED' : 'COPY'}
                      </button>
                    </td>
                    <td style={{ padding: 12 }}><Badge color={status.color} text={status.label} /></td>
                    <td style={{ padding: 12, color: COLORS.subtext, fontSize: 12 }}>{wallet.datasets.join(', ')}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.credit) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.taskCount, 0) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.lifetimeTaskCount, 0) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.avgScore) : '-'}</td>
                    <td style={{ padding: 12, color: COLORS.green }}>{summary ? fmt(summary.totalRewards) : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mobile-cards" style={{ display: 'none' }}>
          {filteredRows.map(({ wallet, summary }) => {
            const status = getStatus(summary)
            return (
              <div key={wallet.address} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <strong>{wallet.name}</strong>
                  <Badge color={status.color} text={status.label} />
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <Badge color={wallet.role === 'validator' ? COLORS.yellow : wallet.role === 'predict' ? COLORS.purple : COLORS.blue} text={wallet.role.toUpperCase()} />
                  <Badge color={COLORS.purple} text={`HOST ${wallet.host}`} />
                </div>
                <div style={{ color: COLORS.cyan, wordBreak: 'break-all', fontSize: 12, marginBottom: 10 }}>{wallet.address}</div>
                <button onClick={() => copyAddress(wallet.address)} style={{ background: 'transparent', color: copied === wallet.address ? COLORS.green : COLORS.subtext, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, cursor: 'pointer', marginBottom: 12 }}>
                  {copied === wallet.address ? 'COPIED' : 'COPY ADDRESS'}
                </button>
                <div style={{ color: COLORS.subtext, fontSize: 12, marginBottom: 12 }}>Datasets: {wallet.datasets.join(', ')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10, fontSize: 13 }}>
                  <SmallField label="Credit" value={summary ? fmt(summary.credit) : '-'} />
                  <SmallField label="Epoch Tasks" value={summary ? fmt(summary.taskCount, 0) : '-'} />
                  <SmallField label="Lifetime Tasks" value={summary ? fmt(summary.lifetimeTaskCount, 0) : '-'} />
                  <SmallField label="Avg Score" value={summary ? fmt(summary.avgScore) : '-'} />
                  <SmallField label="Qualified" value={summary ? fmt(summary.qualifiedEpochs, 0) : '-'} />
                  <SmallField label="Rewards" value={summary ? fmt(summary.totalRewards) : '-'} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, color }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: 'inset 0 0 30px rgba(103,232,249,0.03)' }}>
      <div style={{ color: COLORS.subtext, fontSize: 12, letterSpacing: 1.4, marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color, textShadow: `0 0 18px ${color}33` }}>{value}</div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: 'inset 0 0 30px rgba(167,139,250,0.04)' }}>
      <div style={{ color: COLORS.cyan, fontSize: 13, marginBottom: 12, letterSpacing: 1.4 }}>{title}</div>
      {children}
    </div>
  )
}

function HostLine({ host, count }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', color: COLORS.text }}>
      <span style={{ textTransform: 'uppercase', color: COLORS.subtext }}>{host}</span>
      <strong style={{ color: COLORS.text }}>{count}</strong>
    </div>
  )
}

function Badge({ text, color }) {
  return (
    <span style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}`, color, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
      {text}
    </span>
  )
}

function SmallField({ label, value }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 10 }}>
      <div style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 6 }}>{label}</div>
      <div style={{ color: COLORS.text, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function AutoRefreshToggle({ value, onChange }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', minWidth: 160 }}>
      <span style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 8 }}>AUTO REFRESH</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          background: value ? 'rgba(74,222,128,0.16)' : 'transparent',
          color: value ? COLORS.green : COLORS.subtext,
          border: `1px solid ${value ? COLORS.green : COLORS.border}`,
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: 1,
        }}
      >
        {value ? 'ON · 60S' : 'OFF'}
      </button>
    </div>
  )
}

function ViewToggle({ value, onChange }) {
  const options = [
    { value: 'mine', label: 'MINE' },
    { value: 'predict', label: 'PREDICT' },
  ]

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', minWidth: 180 }}>
      <span style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 8 }}>VIEW</span>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                background: active ? 'rgba(103,232,249,0.16)' : 'transparent',
                color: active ? COLORS.cyan : COLORS.subtext,
                border: `1px solid ${active ? COLORS.cyan : COLORS.border}`,
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 1,
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilterBox({ label, value, onChange, options }) {
  return (
    <label style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', minWidth: 160 }}>
      <span style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 6 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ background: 'transparent', color: COLORS.text, border: 0, outline: 'none', fontFamily: 'inherit' }}>
        {options.map((opt) => <option key={opt} value={opt} style={{ color: 'black' }}>{opt}</option>)}
      </select>
    </label>
  )
}
