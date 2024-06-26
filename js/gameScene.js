/* global Phaser */


//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Yoochan and Gabriel
//Created on: May 2024
//This is the phaser game configuration file

/**
 * This class is he Game Scene.
 */

//{TODO}: flowchart

class GameScene extends Phaser.Scene {
    /**
     * this method is the constructor
     */

    createCar() {
      // console.log("check") //tester
      const Cars = "carLv" + this.carLevel.toString()
      const newCar = this.physics.add.sprite(this.machine.x, this.machine.y, Cars).setScale(0.8)
       this.carGroup.add(newCar)
      } 
      
      UpgradeMachine() {
        const upgradeCost = 800*1.6+(2500 - this.delayLevel)
        if(this.money >= upgradeCost) {
          if(this.delayLevel <= 50){
            alert("you got MAX LEVEL!!")
          }else{
          this.money -= upgradeCost
          this.delayLevel -= 50
          this.delayText.setText('Machine speed: ' + this.delayLevel.toString())
          this.sound.play('upgradeSound')
          }
        }else{
          alert('you need more ' + (parseFloat(upgradeCost) - this.money).toFixed(2).toString() + "$ for upgrade it!")
        }
      }

      UpgradeCar() {
        const upgradeCost = 1000*1.6*this.carLevel
        if(this.money >= upgradeCost) {
          if(this.carLevel >= 10) {
            alert("you got MAX LEVEL!!")
          }else{
          this.money -= upgradeCost
          this.carLevel += 1
          this.levelText.setText('Car Level: ' + this.carLevel.toString())
          this.sound.play('carUpgradeSound') 
        }
        }else{
          alert('you need more ' + (parseFloat(upgradeCost) - this.money).toFixed(2).toString() + "$ for upgrade it!")
        }
      }

    constructor() {
      super({ key: "gameScene"})
  
      this.background = null
      this.carLv1 = null
      this.carLv2 = null
      this.carLv3 = null
      this.carLv4 = null
      this.carLv5 = null
      this.carLv6 = null
      this.carLv7 = null
      this.carLv8 = null
      this.carLv9 = null
      this.carLv10 = null
      this.conveyorBelt = null
      this.seller = null
      this.tierText = null
      this.money = parseFloat(localStorage.getItem('LocalMoney')) || 0.0
      this.moneyText = null
      this.carLevel = parseInt(localStorage.getItem('LocalCarLevel')) || 1
      this.levelText = null
      this.delayLevel = parseInt(localStorage.getItem('LocalDelayLevel')) || 2000
      this.delayText = null
      this.carUpgrade = null
      this.factoryUpgrade = null
      this.alertMoneyText = null

      this.infoTextStyle = {font: '65px Arial', fill:'#ffffff', align: 'center'}
      this.alertTextStyle = {font: '110px Arial', fill:'#ee1111', align: 'center'}
    }
  
    /**
     * Can be defined on your own Scenes.
     * This method is called by the Scene Manager when the scene starts,
     *   before preload() and create().
     * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
     */
    init(data) {
      this.cameras.main.setBackgroundColor("ffffff")
    }
  
    /**
   * Can be use defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log("Game Scene")
    //image
    this.load.image("factoryBackground", "./assets/factoryBackground.png")
    this.load.image("machine1", "./assets/machine1.png")
    this.load.image("belt", "./assets/conveyorbelt-test.png")
    this.load.image("seller", "./assets/seller.png")
    this.load.image("factoryUpgrade","./assets/Button-Upgrade-Factory.png")
    this.load.image("carUpgrade","./assets/Buttoon-Upgrade-Car.png")
    this.load.image("carLv1", "./assets/Biat-lv1.png")
    this.load.image("carLv2", "./assets/Fride-lv2.png")
    this.load.image("carLv3", "./assets/Shinjisis-lv3.png")
    this.load.image("carLv4", "./assets/A'sCar-lv4.png")  
    this.load.image("carLv5", "./assets/lowrider-lv5.png")
    this.load.image("carLv6", "./assets/cakedilock-lv6.png") 
    this.load.image("carLv7", "./assets/ciderTruck-lv7.png")
    this.load.image("carLv8", "./assets/Igniz-lv8.png")
    this.load.image("carLv9", "./assets/primemachine-lv9.png") 
    this.load.image("carLv10", "./assets/Ayrton'sSoul-lv10.png") 
    //sound
    this.load.audio('carUpgradeSound', './assets/Bonk.wav')
    this.load.audio('cash', './assets/Cash-register-SFX.mp3')
    this.load.audio('upgradeSound', './assets/factoryLevelUpSFX.mp3')
  }   
   
    /**
     * Can be defined on your own Scenes.
     * Use it ot create your game objects
     * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
     */
    create(data) { 
      this.background = this.add.image(0, 0, "factoryBackground").setScale(2.0)
      this.background.setOrigin(0, 0)
      //craete texts
      this.moneyText = this.add.text(10, 10, "Money: " + this.money.toString(), this.infoTextStyle).setScale(0.8)
      this.levelText = this.add.text(10, 60, "Car Level: " + this.carLevel.toString(), this.infoTextStyle).setScale(0.8)
      this.delayText = this.add.text(10, 110, "Machine Speed: " + this.delayLevel.toString(), this.infoTextStyle).setScale(0.8)
      //buttons
      //car Upgrade
      this.carUpButton = this.add.image(180, 300, "carUpgrade").setScale(0.8) // car level
      this.carUpButton.setInteractive({ useHandCursor: true})
      this.carUpButton.on('pointerdown', ()=> this.UpgradeCar())
      //machine uprade
      this.spdUpButon = this.add.image(180, 460, "factoryUpgrade").setScale(0.8) //Machine speed
      this.spdUpButon.setInteractive({ useHandCursor: true})
      this.spdUpButon.on('pointerdown', ()=> this.UpgradeMachine())


      //create a group for the missiles 
      this.carGroup = this.physics.add.group()
      //create a  producer
      this.machine = this.add.image(1900 / 2 - 300, 1080 / 2 - 200, "machine1").setScale(1.1)
      //belt
      this.belt = this.add.image(1900 / 2 + 150, 1080 / 2 + 450, "belt").setScale(3.0)
      //seller
      this.seller = this.physics.add.sprite(1900 / 2 + 700, 1080 / 2 + 230, 'seller').setScale(1.7).setOffset(40, 0);
      
      //collisions between seller and car
      this.physics.add.collider(this.seller, this.carGroup, function(sellerCollide, carCollide) {
        carCollide.destroy()
        this.sound.play('cash')
        this.money += (70 + 30*this.carLevel)*1.3
        this.moneyText.setText('Money: ' + this.money.toString())
      }.bind(this))    

      
    } 

    
    /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running 
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */  
    
    

    //every delay(second) call createCar() 
    update(time, delta) {
      // console.log(time.toFixed(0) % this.delayLevel) //test code
      if (time.toFixed(0) % this.delayLevel <= 20) { //delay
        this.createCar()
        localStorage.setItem('LocalMoney',this.money) //save
        localStorage.setItem('LocalDelayLevel',this.delayLevel)
        localStorage.setItem('LocalCarLevel',this.carLevel)
      }


      
    //cheat key
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
      const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keyLeftObj = this.input.keyboard.addKey("LEFT")
      const keyShiftObj = this.input.keyboard.addKey("SHIFT")
      const keyUpObj = this.input.keyboard.addKey("UP")
      const keyDownObj = this.input.keyboard.addKey("Down")
  
      if (keyDownObj.isDown === true && keyShiftObj.isDown === true) { //cheat Lv-
        if(this.carLevel<= 0) {
          this.carLevel = 1
          this.levelText.setText('Car Level: ' + this.carLevel.toString())
        }else{
          this.carLevel = this.carLevel - 1
        this.levelText.setText('Car Level: ' + this.carLevel.toString())
        }
      }

      if (keyUpObj.isDown === true && keyShiftObj.isDown === true) { //cheat Lv-
        if(this.carLevel>= 11) {
          this.carLevel = 10
          this.levelText.setText('Car Level: ' + this.carLevel.toString())
        }else{
          this.carLevel = this.carLevel + 1
        this.levelText.setText('Car Level: ' + this.carLevel.toString())
        }
      }

      if (keyLeftObj.isDown === true && keyShiftObj.isDown === true) { //cheat delay-
        if(this.delayLevel <= 0){
          this.delayLevel = 50
          this.delayText.setText('Machine speed: ' + this.delayLevel.toString())
        }else{this.delayLevel = this.delayLevel - 50
        this.delayText.setText('Machine speed: ' + this.delayLevel.toString())
      }
        
      }

      if (keyRightObj.isDown === true && keyShiftObj.isDown === true)  { //cheat delay+
        if(this.delayLevel >= 2000){
          this.delayLevel = 2000
          this.delayText.setText('Machine speed: ' + this.delayLevel.toString())
        }else{this.delayLevel = this.delayLevel + 50
        this.delayText.setText('Machine speed: ' + this.delayLevel.toString())
      }
    }

      if (keySpaceObj.isDown === true && keyShiftObj.isDown === true) { //craete car cheat
            this.createCar()
        }

        this.carGroup.children.each(function (item) {
        
        if (item.y < 1080 / 2 + 310) { //meet the same y of belt
          item.y = item.y + 10 // I'll change it to 
        }else{item.x = item.x + 10}
      })
      }
    }
    

    
  export default GameScene