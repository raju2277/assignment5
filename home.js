const tabContainer=document.getElementById('button-tab'); //buttoncontainer


tabContainer.addEventListener("click",(event)=>{
    if(event.target.matches('button')){
        const buttons=tabContainer.querySelectorAll('button');

        buttons.forEach(button=>{
            button.classList.remove('btn-primary')
        })

        event.target.classList.add('btn-primary')
        const id=event.target.id;

        

        displayContainer(id);
    }
});

const displayContainer=(id)=>{
    const container=document.getElementById(`${id}-container`);
    containerParent=container.parentNode;

    const containers=containerParent.children;
    [...containers].forEach(container=>{
        container.classList.add('hidden');
    })
    container.classList.remove('hidden')
    loadServers();
    total(container);
}

//load and fetch servers data

const loadServers=()=>{
    const url=('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
    .then(res=>res.json())
    .then((json)=>displayServers(json.data));
}
loadServers();

//display servers data

const displayServers=(servers)=>{
    const allContainer=document.getElementById('all-container');
    allContainer.innerHTML="";
    const openContainer=document.getElementById('open-container');
    openContainer.innerHTML="";
    const closeContainer=document.getElementById('close-container');
    closeContainer.innerHTML="";

    

    servers.forEach(server=>{
        

        if(server.status == 'open'){
           //will append those file are opened
            const card=document.createElement('div')
           card.innerHTML=`
                <div  class="shadow-md rounded-sm border-t-3 border-green-500 h-full">
                            <div class="p-[14px] space-y-2">
                                <div class=" flex  justify-between items-center">
                                <img class="w-[24px] h-[24px]" src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
                                <button class="px-8 py-1 text-[#EF4444] bg-[#FEECEC] rounded-full">${server.priority}</button>
                                </div>
                                <h2 class="text-[#1F2937] font-semibold">${server.title}</h2>
                                <p class="text-[#64748B] text-sm">${server.description}</p>
                                <div class="">
                                    <button class="px-2 py-2 text-[#EF4444] bg-[#FEECEC] rounded-full"><i class="fa-solid fa-bug"></i>${server.labels[0]}</button>
                                    <button class="px-2 py-1 text-[#D97706] bg-[#FDE68A] rounded-full"><i class="fa-solid fa-life-ring"></i>${server.labels[1]?server.labels[1]:'none'}</button>
                                </div>
                                    <hr class="text-[#64748B50] my-4">
                                <p class="text-[#64748B] text-sm">#1 by ${server.assignee}</p>
                                <p class="text-[#64748B] text-sm">${server.createdAt}</p>
                             </div>
                        </div>
           
           
           `;
        //    openContainer.appendChild(card);
           allContainer.appendChild(card);
           const cloneCard=card.cloneNode(true);
           openContainer.appendChild(cloneCard);
           
        }
        else if(server.status == 'closed'){
            const card=document.createElement('div')
           card.innerHTML=`
                <div  class="shadow-md rounded-sm border-t-3 border-purple-500 h-full">
                            <div class="p-[14px] space-y-2">
                                <div class=" flex  justify-between items-center">
                                <img class="w-[24px] h-[24px]" src="./B13-A5-Github-Issue-Tracker/assets/Closed- Status .png" alt="">
                                <button class="px-8 py-1 text-[#EF4444] bg-[#FEECEC] rounded-full">${server.priority}</button>
                                </div>
                                <h2 class="text-[#1F2937] font-semibold">${server.title}</h2>
                                <p class="text-[#64748B] text-sm">${server.description}</p>
                                <div class="">
                                    <button class="px-2 py-2 text-[#EF4444] bg-[#FEECEC] rounded-full"><i class="fa-solid fa-bug"></i>Bug</button>
                                    <button class="px-2 py-1 text-[#D97706] bg-[#FDE68A] rounded-full"><i class="fa-solid fa-life-ring"></i>Help Wanted</button>
                                </div>
                                    <hr class="text-[#64748B50] my-4">
                                <p class="text-[#64748B] text-sm">#1 by ${server.assignee}</p>
                                <p class="text-[#64748B] text-sm">${server.createdAt}</p>
                             </div>
                        </div>
           
           
           `;
           allContainer.appendChild(card);
           const cloneCard=card.cloneNode(true);
           closeContainer.appendChild(cloneCard);
        }
        
    })

    
   
};

function total(rcv){
    const count=rcv.children.length;
    countTotal(count);
}

function countTotal(total){
    const totalCount=document.getElementById('count');
    totalCount.innerText=total ;
};

