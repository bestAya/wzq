$(function () {
    let hei={};
    let bai={};
    let kongba={};
    let Ai=true;
    for(let i=0;i<15;i++){
        $('<span>').addClass('shu').appendTo(".qipan");
        $('<div>').addClass('hang').appendTo(".qipan");
        for(let j=0;j<15;j++){
            kongba[i+'_'+j]={x:i,y:j};
            $('<li>').addClass('qizi').attr('id',i+"_"+j).data('pos',{x:i,y:j}).appendTo(".qipan");
        }
    }

    let flag=true;
    $('ul>li').on('click',function () {
        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        data=$(this).data('pos')
        if(flag){
            $(this).addClass('hei');
            hei[data.x+'_'+data.y] = true;
            delete kongba[data.x+"_"+data.y];
            if(panduan(data,hei)>=5){
                $('.qipan .qizi').off();
                alert('黑棋胜')
            };
            if(Ai){
                let pos=ai();
                $(`#${pos.x}_${pos.y}`).addClass('bai')
                bai[pos.x+'_'+pos.y] = true;
                delete kongba[pos.x+'_'+pos.y];
                if(panduan(pos,bai)>=5){
                    $('ul>li').off();
                    alert('白棋赢');
                }
                return;
            }

        }else {
            $(this).addClass('bai');
            bai[data.x+"_"+data.y]=true;
            delete kongba[data.x+"_"+data.y];
            if(panduan(data,bai)>=5){
                $('ul>li').off();
                alert('白棋赢');
            }
        }
        flag=!flag;
    });
    function ai(){
        let max=-Infinity;
        let max1=-Infinity;
        let zb=null;
        let zb1=null;
        for(let i in kongba){
            if(panduan(kongba[i],bai)>=max){
                max=panduan(kongba[i],bai);
                zb=kongba[i];
            };
        }
        for(let i in kongba){
            if(panduan(kongba[i],hei)>=max1){
                max1=panduan(kongba[i],hei);
                zb1=kongba[i];
            };
        }
        return (max>max1) ? zb : zb1;
    }
    function panduan(pos,obj) {
            let rows=1,cols=1,zx=1,yx=1;
            let i=pos.x,j=pos.y+1;
            while(obj[i+'_'+j]){
                rows++;
                j++;
            }
            j=pos.y-1;
            while(obj[i+'_'+j]){
                rows++;
                j--;
            }

            i=pos.x+1;j=pos.y;
            while(obj[i+'_'+j]){
                cols++;
                i++;
            }
            i=pos.x-1;
            while(obj[i+'_'+j]){
                cols++;
                i--;
            }

            i=pos.x+1;j=pos.y-1;
            while(obj[i+'_'+j]){
                zx++;
                i++;
                j--;
            }
            i=pos.x-1;j=pos.y+1;
            while(obj[i+'_'+j]){
                zx++;
                i--;
                j++;
            }

            i=pos.x-1;j=pos.y-1;
            while(obj[i+'_'+j]){
                yx++;
                i--;
                j--;
            }
            i=pos.x+1;j=pos.y+1;
            while(obj[i+'_'+j]){
                yx++;
                i++;
                j++;
            }
            return Math.max(rows,cols,zx,yx);
        }
});