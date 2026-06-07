const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Customer = require('./models/Customer')
const User = require('./models/User')

dotenv.config()

const customers = [
  { name: 'Alice Johnson', email: 'alice@techcorp.com', phone: '03001111001', company: 'TechCorp', status: 'Active', address: 'Lahore, Pakistan', notes: 'Key enterprise client' },
  { name: 'Bob Smith', email: 'bob@ventures.com', phone: '03001111002', company: 'Smith Ventures', status: 'Lead', address: 'Karachi, Pakistan', notes: 'Interested in premium plan' },
  { name: 'Carol White', email: 'carol@designhub.com', phone: '03001111003', company: 'DesignHub', status: 'Active', address: 'Islamabad, Pakistan', notes: 'Renews annually' },
  { name: 'David Lee', email: 'david@cloudbase.io', phone: '03001111004', company: 'CloudBase', status: 'Inactive', address: 'Rawalpindi, Pakistan', notes: 'Contract ended' },
  { name: 'Eva Martinez', email: 'eva@marketpro.com', phone: '03001111005', company: 'MarketPro', status: 'Lead', address: 'Faisalabad, Pakistan', notes: 'Follow up next week' },
  { name: 'Frank Brown', email: 'frank@buildfast.com', phone: '03001111006', company: 'BuildFast', status: 'Active', address: 'Multan, Pakistan', notes: 'Referred by Carol' },
  { name: 'Grace Kim', email: 'grace@nexatech.com', phone: '03001111007', company: 'NexaTech', status: 'Active', address: 'Lahore, Pakistan', notes: 'Upgraded to enterprise' },
  { name: 'Henry Wilson', email: 'henry@logicworks.com', phone: '03001111008', company: 'LogicWorks', status: 'Inactive', address: 'Karachi, Pakistan', notes: 'Unresponsive since March' },
  { name: 'Isla Thompson', email: 'isla@pixelstudio.com', phone: '03001111009', company: 'PixelStudio', status: 'Lead', address: 'Islamabad, Pakistan', notes: 'Demo scheduled' },
  { name: 'Jake Anderson', email: 'jake@dataflow.io', phone: '03001111010', company: 'DataFlow', status: 'Active', address: 'Peshawar, Pakistan', notes: 'Monthly billing' },
  { name: 'Karen Scott', email: 'karen@brightmedia.com', phone: '03001111011', company: 'BrightMedia', status: 'Lead', address: 'Quetta, Pakistan', notes: 'Requested proposal' },
  { name: 'Leo Garcia', email: 'leo@swiftdev.com', phone: '03001111012', company: 'SwiftDev', status: 'Active', address: 'Lahore, Pakistan', notes: 'Long term client' },
  { name: 'Mia Robinson', email: 'mia@greenleaf.com', phone: '03001111013', company: 'GreenLeaf', status: 'Inactive', address: 'Karachi, Pakistan', notes: 'Budget constraints' },
  { name: 'Noah Clark', email: 'noah@fusionlabs.com', phone: '03001111014', company: 'FusionLabs', status: 'Active', address: 'Islamabad, Pakistan', notes: 'Expanding team' },
  { name: 'Olivia Hall', email: 'olivia@peaksoft.com', phone: '03001111015', company: 'PeakSoft', status: 'Lead', address: 'Rawalpindi, Pakistan', notes: 'Trial period active' },
]

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected')

  const user = await User.findOne({ email: 'test@test.com' })
  if (!user) {
    console.error('Test user not found. Register first via Postman.')
    process.exit(1)
  }

  await Customer.deleteMany({ createdBy: user._id })

  const seeded = customers.map(c => ({ ...c, createdBy: user._id }))
  await Customer.insertMany(seeded)

  console.log('15 customers seeded successfully')
  process.exit()
}

seed()