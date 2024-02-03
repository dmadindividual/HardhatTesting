const hre = require("hardhat")

const main = async()=>{
    const currentTimeStampInSeconds = Math.round(Date.now() / 1000)
    const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60
    const unlockedTime = currentTimeStampInSeconds + ONE_YEAR_IN_SECONDS 

    const lockedAmount = hre.ethers.parseEther("1")
    // console.log(`Current Time: ${currentTimeStampInSeconds}`)
    // console.log(`One Year in seconds: ${ONE_YEAR_IN_SECONDS}`)
    // console.log(`Unlocked Time: ${unlockedTime}`)
    const Mytest = await hre.ethers.getContractFactory("Mytest")
    const mytest = await Mytest.deploy(unlockedTime, {value: lockedAmount})

    await mytest.waitForDeployment()

    console.log(mytest.target)
}

main().catch((error)=>{
    console.log(error)
    process.exitCode = 1
})