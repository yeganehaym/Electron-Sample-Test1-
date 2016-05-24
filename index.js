const electron = require('electron');
const {app,dialog,BrowserWindow,Menu,shell} = electron;
const {ipcMain} = require('electron');

let win;

  app.on('ready', function () {
      win = new BrowserWindow({width: 800, height: 600});
      win.loadURL(`file://${__dirname}/index.html`);
      win.setTitle('this is my first app for testing electron');

    var app_menu=[
      {
        label:'پرونده',
        submenu:[
          {
            label:'باز کردن',
            accelerator:'CmdOrCtrl+O',
            click:()=>{

               dialog.showOpenDialog({
                 title:'باز کردن فایل متنی',
                  properties: [ 'openFile']//[ 'openFile', 'openDirectory', 'multiSelections' ]
                 ,filters:[
                 {name:'فایل های نوشتاری' , extensions:['txt','text']},
                 {name:'جهت تست' , extensions:['doc','docx']}
                  ]
               },
                 (filename)=>{
                   if(filename===undefined)
                      return;

                      win.webContents.send('openFile',filename);
                  // dialog.showMessageBox({title:'پیام اطلاعاتی',type:"info",buttons:['تایید'],message:`the name of file is [${filename}]`});
                });

            }
          },
          {
            label:'ذخیره',
            accelerator:'CmdOrCtrl+S',
            click:()=>{
              dialog.showSaveDialog({
                title:'باز کردن فایل متنی',
                 properties: [ 'openFile']//[ 'openFile', 'openDirectory', 'multiSelections' ]
                ,filters:[
                {name:'فایل های نوشتاری' , extensions:['txt','text']}
                 ]
              },
                (filename)=>{
                  if(filename===undefined)
                     return;
                       win.webContents.send('saveFile',filename);
               });
            }
          }
        ]
      },
      {
        label:'سیستم',
        submenu:[
          {
            label:'درباره ما',
            click:()=>
            {
              shell.openExternal('http://www.dotnettips.info');
            }
          },
          {
            label:'خروج',
            accelerator:'CmdOrCtrl+X',
            role:'close'
          }
        ]
      }
    ];

      if(process.platform=="darwin")
      {
        const app_name=app.getName();
        app_menu.unshift({
          label:app_name
        })
      }
      var menu=Menu.buildFromTemplate(app_menu);
      Menu.setApplicationMenu(menu);
});
