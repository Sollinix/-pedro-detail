
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
self.addEventListener('push',event=>{
  let data={};
  try{data=event.data?event.data.json():{}}catch{data={body:event.data?event.data.text():''}}
  const title=data.title||'Pedro Detail';
  const options={
    body:data.body||'Há uma atualização no serviço do seu veículo.',
    icon:'./icon-192.png',
    badge:'./icon-192.png',
    tag:data.tag||'pedro-detail-update',
    renotify:true,
    data:{url:data.url||'./cliente.html'}
  };
  event.waitUntil(self.registration.showNotification(title,options))
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=event.notification.data?.url||'./cliente.html';
  event.waitUntil((async()=>{
    const all=await clients.matchAll({type:'window',includeUncontrolled:true});
    for(const c of all){
      if('focus'in c){
        try{await c.navigate(target)}catch{}
        return c.focus()
      }
    }
    if(clients.openWindow)return clients.openWindow(target)
  })())
});
