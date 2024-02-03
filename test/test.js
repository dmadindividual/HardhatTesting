const {time, loadFixture} = require('@nomicfoundation/hardhat-network-helpers');

const {anyValue} = require('@nomicfoundation/hardhat-chai-matchers/withArgs')

const {expect} = require('chai');
const {ethers} = require('hardhat');
const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace');

describe('Mytest', function(){
    async function RunEveryTime(){
        const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60
        const ONE_GWEI = 1000000000

        const lockedAmount = ONE_GWEI
        const unlockedTime = await(time.latest()) + ONE_YEAR_IN_SECONDS

        const [owner, accounts] = await ethers.getSigners()
        const Mytest = await ethers.getContractFactory("Mytest")
        const mytest = await Mytest.deploy(unlockedTime, {value: lockedAmount})

        return {mytest, unlockedTime, lockedAmount, owner, accounts}

 
    }

    describe("Deployment", function(){
        it('it should test unlocked time', async function(){
            const {mytest,unlockedTime} = await loadFixture(RunEveryTime)
            expect(await mytest.unlockedTime()).to.equal(unlockedTime)
        })

        it('it should be the owner', async()=>{
            const {mytest, owner} = await loadFixture(RunEveryTime)

            expect(await mytest.owner()).to.equal(owner.address)
        })

        it("receive and store the funds to mytest", async()=>{
            const {mytest, lockedAmount} = await loadFixture(RunEveryTime)
            expect(await ethers.provider.getBalance(mytest.target)).to.equal(lockedAmount)
        })

        it('latest time should be in the future', async()=>{
            const latestTime = await time.latest()
            const Mytest = await ethers.getContractFactory("Mytest")

           await expect(Mytest.deploy(latestTime, {value: 1})).to.be.revertedWith("Time is already passed")

            
        })

    })

    describe("Withdrawal", function(){
        describe('validate', function(){
            it('it should be the owner', async()=>{
                const {mytest} = await loadFixture(RunEveryTime)
                await expect(mytest.withdraw()).to.be.revertedWith("Time is not yet passed")
            })

            it('should revert if you are not the owner', async()=>{
                const {mytest,unlockedTime, accounts} = await loadFixture(RunEveryTime)
             await time.increase(unlockedTime)
             await expect(mytest.connect(accounts).withdraw()).to.be.revertedWith("You are not the owner")
            })

            it('should not fail if its the owner that call it', async()=>{
                const {mytest, unlockedTime} = await loadFixture(RunEveryTime)
                await time.increase(unlockedTime)
               await expect(mytest.withdraw()).to.not.be.reverted
                
            })

        })

    })

    describe('Events', function(){
        it('should emit an event', async function(){
            const {mytest, unlockedTime, lockedAmount } = await loadFixture(RunEveryTime)
            await time.increase(unlockedTime)
            await expect(mytest.withdraw()).to.emit(mytest, "Withdrawal").withArgs(lockedAmount, anyValue)
        })
    })
        
RunEveryTime()
})