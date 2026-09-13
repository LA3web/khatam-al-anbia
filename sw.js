self.addEventListener("install",event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));

self.addEventListener("push",event=>{
  let data={title:"خاتم‌الانبیاء",body:"اعلان جدید",url:"./"};
  try{if(event.data)data=event.data.json()}catch(e){}
  event.waitUntil(self.registration.showNotification(data.title||"خاتم‌الانبیاء",{
    body:data.body||"اعلان جدید",
    icon:data.icon||"/favicon.ico",
    badge:data.badge||"/favicon.ico",
    dir:"rtl",
    lang:"fa",
    vibrate:[200,100,200],
    requireInteraction:false,
    data:{url:data.url||"./"}
  }));
});

self.addEventListener("notificationclick",event=>{
  event.notification.close();
  const url=event.notification.data?.url||"./";
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const c of list){
      if("focus" in c)return c.focus();
    }
    if(clients.openWindow)return clients.openWindow(url);
  }));
});
